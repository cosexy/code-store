// A basic field policy that uses options.args.{offset,limit} to splice
// the incoming data into the existing array. If your arguments are called
// something different (like args.{start,count}), feel free to copy/paste
// this implementation and make the appropriate changes.
import { FieldPolicy, Reference } from '@apollo/client/core'

export function useOffsetLimitPagination<T extends Reference> (
  keyArgs: FieldPolicy['keyArgs'] = false
): FieldPolicy<T[]> {
  return {
    keyArgs,
    merge: (existing = [], incoming, { variables }) => {
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
      return edges as T[]
    }
  }
}
