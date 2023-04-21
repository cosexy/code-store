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

export const useDialog = <T = any>(name: string, options?: IOptions<T>) => {
  if (!name) {
    throw new Error('name is required')
  }

  const store = useDialogStore()

  const modalIndex = useArrayFindIndex(store.modals, (modal) => modal.name === name)
  if (modalIndex.value === -1) {
    console.log('create modal', name, options)

    store.modals.value.push({
      name,
      actived: false,
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

  if (options?.actived && modal.value) {
    onMounted(() => nextTick(() => {
      setTimeout(() => {
        modal.value.actived = true
      }, 300)
    }))
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
