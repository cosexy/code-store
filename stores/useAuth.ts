import { defineStore } from 'pinia'
import { User } from '~/apollo/__generated__/graphql'
interface State {
    token?: string
    user?: User
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
