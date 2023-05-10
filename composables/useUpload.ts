import { Document, Image } from '~/apollo/__generated__/graphql'

type FileType = Pick<Image, 'id' | 'path'> | Pick<Document, 'id' | 'path'>

export const useUpload = () => {
  const runtimeConfig = useRuntimeConfig()
  const authStore = useAuth()

  const fetchResult = createEventHook<FileType[]>()
  const fetchError = createEventHook<any>()

  const loading = ref<boolean>(false)

  const upload = async (_: File | File[] | FileList, type: 'images' | 'documents', group?: string) => {
    loading.value = true

    const files = _ instanceof FileList ? Array.from(_) : Array.isArray(_) ? _ : [_]

    const formData = new FormData()
    files.forEach(file => {
      formData.append(type, file)
    })
    group && formData.append('group', group)

    try {
      const res = await $fetch<FileType[]>(new URL(`/${type}`, runtimeConfig.public.apiBackend).href, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authStore.token}`
        },
        body: formData
      })

      await fetchResult.trigger(res)

      return res
    } catch (e) {
      await fetchError.trigger(e)
    }

    loading.value = false
  }

  const images = async (_: File | File[] | FileList, group?: string) => upload(_, 'images', group)
  const documents = async (_: File | File[] | FileList, group?: string) => upload(_, 'documents', group)

  return {
    images,
    documents,
    upload,
    onResult: fetchResult.on,
    onError: fetchError.on
  }
}
