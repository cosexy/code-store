// eslint-disable-next-line import/named
import { defineApolloClient } from '@nuxtjs/apollo'
import { offsetLimitPagination } from '@apollo/client/utilities/policies/pagination'

export default defineApolloClient({
  httpEndpoint: process.env.NUXT_PUBLIC_APOLLO_ENDPOIT!,
  wsEndpoint: process.env.NUXT_PUBLIC_APOLLO_WS_ENDPOIT,
  tokenName: 'apollo:codestore.token',
  inMemoryCacheOptions: {},
  connectToDevTools: true
})
