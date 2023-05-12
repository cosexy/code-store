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
        reviews: {
          keyArgs: ['filter', ['sort', 'product', 'user']],
          merge: (existing: Reference[] = [], incoming: Reference[], { variables }) => {
            const merged = existing ? existing.slice(0) : []
            const offset = variables?.filter?.offset || 0
            for (let i = 0; i < incoming.length; ++i) {
              merged[offset + i] = incoming[i]
            }

            return merged
          },
          read (existing, { canRead }) {
            if (!existing) {
              return
            }
            const edges = []

            for (let i = 0; i < existing.length; ++i) {
              edges[i] = canRead(existing[i]) ? existing[i] : null
            }
            return edges
          }
        }
      }
    }
  })
})
