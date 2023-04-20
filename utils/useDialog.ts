import { DialogEntity } from '~/entities/dialog.entity'

interface IOptions<T = any> {
  actived?: boolean
  data?: T
}

export const useDialogStore = createGlobalState(
  () => {
    const modals = ref<DialogEntity[]>([])
    return { modals }
  }
)

export const useDialog = <T = any>(chanel: string, options?: IOptions<T>) => {
  if (!chanel) {
    throw new Error('chanel is required')
  }

  const store = useDialogStore()

  const modalIndex = useArrayFindIndex(store.modals, (modal) => modal.id === chanel)
  if (modalIndex.value === -1) {
    store.modals.value.push({
      id: chanel,
      actived: options?.actived || false,
      data: options?.data
    })
  }
  const modal = computed({
    get: () => store.modals.value[modalIndex.value],
    set: (value) => {
      store.modals.value[modalIndex.value] = value
    }
  })

  const open = (data?: T) => {
    modal.value.data = data
    modal.value.actived = true
    onReceive.trigger(data)
  }
  const close = () => {
    onClosed.trigger(modal.value.data)
    modal.value.actived = false
    modal.value.data = undefined
  }

  const onReceive = createEventHook<T|undefined>()
  const onClosed = createEventHook<T|undefined>()

  const toggle = (data?: T) => {
    if (modal.value.actived) {
      close()
    } else {
      open(data)
    }
  }

  return {
    onReceive: onReceive.on,
    onClosed: onClosed.on,
    modal,
    open,
    close,
    toggle,
    modals: store.modals
  }
}
