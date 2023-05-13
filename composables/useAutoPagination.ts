import { MaybeRefOrGetter, toRef } from '@vueuse/core'
interface Config extends Record<string, any>{
    offset?: number
    limit?: number
}

type Maybe<T> = T | null

export const useAutoPagination = <T>(
  source: MaybeRefOrGetter<T[]>,
  _count: MaybeRefOrGetter<number>,
  initOptions?: MaybeRefOrGetter<Config> | Config
) => {
  const options = toRef(initOptions)
  const offset = computed(() => options.value?.offset ?? 0)
  const limit = computed(() => options.value?.limit ?? 10)

  const count = toRef(_count)

  const array = toRef(source)
  const data = computed<Maybe<T>[]>(
    () => Array(count.value).fill(null).map((_, i) => array.value[i])
  )

  const items = computed<T[]>(
    () => data.value
      .slice(offset.value, offset.value + limit.value)
      .filter((item) => item) as T[]
  )

  const onLoad = createEventHook<number>()

  const toOffset = async (offset: number) => {
    const _items = data.value.slice(offset, offset + limit.value)
    if (_items.some((item) => !item)) {
      await onLoad.trigger(offset)
    }
    options.value = {
      ...options.value,
      offset
    }
  }

  const toPage = async (page: number) => toOffset(limit.value * (page - 1))

  return {
    data,
    items,
    toOffset,
    toPage,
    count,
    options,
    onLoad: onLoad.on,
    limit,
    offset
  }
}
