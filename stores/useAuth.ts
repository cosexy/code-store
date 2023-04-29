import { defineStore } from 'pinia'
import { MeItemFragment } from '~/apollo/__generated__/graphql'
interface State {
    token?: string
    user?: MeItemFragment
}

export const useAuth = defineStore<string, State>({
  id: 'auth',
  state: () => ({
    user: undefined,
    token: undefined
  }),

  getters: {
    auth: (state) => !!state.user
  }
})
