import { MaybeRefOrGetter, toRef } from '@vueuse/core'

interface Config {
    offset?: number
    limit?: number
}

type Maybe<T> = T | null

export const useAutoPagination = <T>(
  source: MaybeRefOrGetter<T[]>,
  _count: MaybeRefOrGetter<number>,
  initValue?: Config
) => {
  const options = reactive<Required<Config>>({
    offset: initValue?.offset ?? 0,
    limit: initValue?.limit ?? 10
  })
  const count = toRef(_count)
  const array = toRef(source)

  const data = computed<Maybe<T>[]>(
    () => Array(count.value).fill(null).map((_, i) => array.value[i])
  )

  const items = computed<T[]>(
    () => data.value
      .slice(options.offset, options.offset + options.limit)
      .filter((item) => item) as T[]
  )

  const onLoad = createEventHook<number>()

  const toOffset = async (offset: number) => {
    const _items = data.value.slice(offset, offset + options.limit)
    if (_items.some((item) => !item)) {
      await onLoad.trigger(offset)
    }
    options.offset = offset
  }

  const toPage = async (page: number) => toOffset(options.limit * (page - 1))

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
