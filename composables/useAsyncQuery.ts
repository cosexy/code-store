import { hash } from 'ohash'
import { DocumentNode, print } from 'graphql'
import { DocumentParameter, OptionsParameter, VariablesParameter } from '@vue/apollo-composable/dist/useQuery'
import { OperationVariables } from '@apollo/client/core'

type Options<TResult, TVariables> = OptionsParameter<TResult, TVariables> & {
  key?: string
}

export const useAsyncQuery = async <TResult = any, TVariables extends OperationVariables = OperationVariables> (document: DocumentParameter<TResult, TVariables>, variables?: VariablesParameter<TVariables>, options?: Options<TResult, TVariables>) => {
  const { client } = useApolloClient()

  const fn = () => client.query<TResult, TVariables>({
    query: document as DocumentNode,
    variables: variables as TVariables
  }).then((res) => res.data)

  const key = options?.key || hash({ query: print(document as DocumentNode), variables })
  await useAsyncData(key, fn)

  return useQuery(document, variables as TVariables)
}
