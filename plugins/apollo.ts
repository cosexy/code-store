import { InMemoryCache } from '@apollo/client'
import { useApolloClient } from '@vue/apollo-composable'

export default defineNuxtPlugin((nuxtApp) => {
  const { client } = useApolloClient()
  const authStore = useAuth()

  nuxtApp.hook('apollo:auth', ({ client, token }) => {
    if (authStore.token && client === 'default') {
      token.value = authStore.token
    }
  })
  // setup cache
  ;(client.cache as InMemoryCache).policies.addTypePolicies({
    Query: {
      fields: {
        reviews: useOffsetLimitPagination(['filter', ['product', 'user']]),
        products: useOffsetLimitPagination(['filter', ['category', 'user']]),
        studioProducts: useOffsetLimitPagination(['filter', ['sort']]),
        studioUsers: useOffsetLimitPagination(['filter', ['sort', 'name']])
      }
    }
  })
})
