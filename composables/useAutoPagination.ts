import { MaybeRefOrGetter, toRef } from '@vueuse/core'
interface Config {
    offset: number
    limit: number
}

type Maybe<T> = T | null

export const useAutoPagination = <T>(
  source: MaybeRefOrGetter<T[]>,
  _count: MaybeRefOrGetter<number>,
  initValue: MaybeRefOrGetter<Config>
) => {
  const options = toRef(initValue)

  const count = toRef(_count)
  const array = toRef(source)

  const data = computed<Maybe<T>[]>(
    () => Array(count.value).fill(null).map((_, i) => array.value[i])
  )

  const items = computed<T[]>(
    () => data.value
      .slice(options.value.offset, options.value.offset + options.value.limit)
      .filter((item) => item) as T[]
  )

  const onLoad = createEventHook<number>()

  const toOffset = async (offset: number) => {
    const _items = data.value.slice(offset, offset + options.value.limit)
    if (_items.some((item) => !item)) {
      await onLoad.trigger(offset)
    }
    options.value.offset = offset
  }

  const toPage = async (page: number) => toOffset(options.value.limit * (page - 1))

  return {
    data,
    items,
    toOffset,
    toPage,
    count,
    options,
    onLoad: onLoad.on
  }
}
