interface IOptions {
  once?: boolean
  initial?: boolean
}
export const useModal = <T = any>(chanel: string, options?: IOptions) => {
  if (!chanel) {
    throw new Error('chanel is required')
  }

  const [visible, toggleVisible] = useToggle(options?.initial ?? false)

  const { on, once, emit } = useEventBus<string>('modal:' + chanel)

  const onReceive = createEventHook<T|undefined>()

  const listener = (event: string, payload: T) => {
    if (event === 'modal:' + chanel) {
      toggleVisible()
      onReceive.trigger(payload)
    }
  }

  let unsubscribe: any

  if (options?.once) {
    once(listener)
  } else {
    unsubscribe = on(listener)
  }

  tryOnUnmounted(() => unsubscribe?.())

  return {
    toggle: (payload: T) => emit('modal:' + chanel, payload),
    onReceive: onReceive.on,
    visible,
    toggleVisible
  }
}
