import { DialogEntity } from '~/entities/dialog.entity'

interface IOptions<T = any> {
  actived?: boolean
  data?: T
  watch?: boolean
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

  const onReceive = createEventHook<T|undefined>()
  const onClosed = createEventHook()

  if (options?.watch) {
    watch(() => modal.value.actived, (value) => {
      if (value) {
        onReceive.trigger(modal.value.data)
      } else {
        onClosed.trigger(undefined)
      }
    })
  }

  const open = (data?: T) => {
    modal.value.data = data
    modal.value.actived = true
  }
  const close = () => {
    modal.value.actived = false
    modal.value.data = undefined
  }

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
