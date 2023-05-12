import { ApolloLink, Reference } from '@apollo/client/core'
import { InMemoryCache } from '@apollo/client'

export default defineNuxtPlugin(() => {
  const { client } = useApolloClient()

  // add RoundTrip
  const roundTripLink = new ApolloLink((operation, forward) => {
    // Called before operation is sent to server
    operation.setContext({ start: Date.now() })
    return forward(operation).map((data) => {
      // Called after server responds
      const time = Date.now() - operation.getContext().start
      console.log(`💥 Operation: ${operation.operationName} took ${time} to complete`)
      return data
    })
  })
  client.setLink(roundTripLink.concat(client.link))

  // setup cache
  ;(client.cache as InMemoryCache).policies.addTypePolicies({
    Query: {
      fields: {
        reviews: useOffsetLimitPagination(['filter', ['sort', 'product', 'user']])
      }
    }
  })
})
