import { getCookie } from 'h3'

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
        authStore.user = data.me
        authStore.token = token
      }
    } catch (e) {
      // console.log(e)
    }
  }

  nuxtApp.hooks.hook('app:created', async () => {
    //
  })
})
