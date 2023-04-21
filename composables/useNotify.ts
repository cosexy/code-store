import { NotifyEntity } from '~/entities/notify.entity'

interface IProps<T> {
    chanel?: string
    onReceive?: (data: T) => void
}

export const useNotify = <T = NotifyEntity>(props?: IProps<T>) => {
  const {
    isSupported,
    data,
    post,
    error
  } = useBroadcastChannel<T, T>({ name: props?.chanel || 'notify' })

  watch(data, (value) => props?.onReceive?.(value))

  return {
    isSupported,
    data,
    fire: (data: T) => post(data),
    error
  }
}
