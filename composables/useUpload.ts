import { ImageItemFragment } from '~/apollo/__generated__/graphql'

export const useUpload = () => {
  const runtimeConfig = useRuntimeConfig()
  const authStore = useAuth()

  const fetchResult = createEventHook<ImageItemFragment[]>()
  const fetchError = createEventHook<any>()

  const loading = ref<boolean>(false)
  const upload = async (_: File | File[], group?: string) => {
    loading.value = true

    const files = Array.isArray(_) ? _ : [_]

    const formData = new FormData()
    files.forEach(file => {
      formData.append('images', file)
    })
    group && formData.append('group', group)

    try {
      const res = await $fetch<ImageItemFragment[]>(new URL('/images', runtimeConfig.public.apiBackend).href, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authStore.token}`
        },
        body: formData
      })

      fetchResult.trigger(res)

      return res
    } catch (e) {
      fetchError.trigger(e)
    }

    loading.value = false
  }

  return {
    upload,
    onResult: fetchResult.on,
    onError: fetchError.on
  }
}
