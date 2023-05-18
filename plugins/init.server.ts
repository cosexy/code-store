import { getCookie, deleteCookie } from 'h3'

export default defineNuxtPlugin(async (nuxtApp) => {
  const authStore = useAuth()

  const token = getCookie(useRequestEvent(), 'apollo:codestore.token')
  if (token) {
    try {
      const { client } = useApolloClient()
      const { data } = await client.query({
        query: MeDocument
      })

      if (data.me) {
        // @ts-ignore
        authStore.user = data.me
        authStore.token = token
      }
    } catch (e) {
      deleteCookie(useRequestEvent(), 'apollo:codestore.token')
    }
  }

  nuxtApp.hooks.hook('app:created', async () => {
    //
  })
})
