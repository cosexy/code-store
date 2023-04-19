// eslint-disable-next-line import/named
import { defineApolloClient } from '@nuxtjs/apollo'
// import { CategoriesVariables } from '~/apollo/queries/__generated__/Categories'

export default defineApolloClient({
  httpEndpoint: '/graphql',
  connectToDevTools: true,
  inMemoryCacheOptions: {
    // typePolicies: {
    //   Query: {
    //     fields: {
    //       categories: {
    //         keyArgs: ['filter', ['name', 'sort']],
    //         merge (existing = [], incoming, options) {
    //           const merged = existing ? existing.slice(0) : []
    //
    //           const variables = options.variables as CategoriesVariables
    //
    //           for (let i = 0; i < incoming.length; ++i) {
    //             merged[variables.filter.offset + i] = incoming[i]
    //           }
    //           return merged
    //         }
    //       }
    //     }
    //   }
    // }
  }
})
