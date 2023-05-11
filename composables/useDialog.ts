interface DialogEntity<T = any> {
  name: string
  actived?: boolean
  data?: T
}

interface DialogOptions<T = any> extends Omit<DialogEntity<T>, 'name'>{
  watch?: boolean
}

const [useProvideModalStore, useState] = createInjectionState(() => {
  // state
  const modals = reactive<Record<string, DialogEntity>>({})

  return {
    modals
  }
})

export {
  useProvideModalStore
}

export const useDialog = <T = any>(name: string, options?: DialogOptions<T>) => {
  const store = useState()!

  if (!store.modals[name]) {
    store.modals[name] = {
      name,
      actived: false,
      data: options?.data
    }
  }

  const modal = computed({
    get: () => store.modals[name],
    set: (value) => {
      store.modals[name] = value
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
