import { defineStore } from 'pinia'
import { UserInformationFragment } from '~/apollo/__generated__/graphql'
interface State {
    token?: string
    user?: UserInformationFragment
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
