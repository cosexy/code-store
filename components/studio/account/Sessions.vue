<template>
  <studio-account-tab
    name="Log out other sessions"
    subject="Please enter your password to confirm you would like to log out of your other sessions across all of your devices."
  >
    <form-instance
      class="md:col-span-2"
      :value="input"
      :rules="rules"
      @on-ok="openConfirm = true"
    >
      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
        <form-item
          v-if="$route.name !== 'studio-account-id'"
          v-slot="{ message }"
          name="password"
          label="Current password"
          class="col-span-full"
        >
          <input
            id="password"
            v-model="input.password"
            type="password"
            name="password"
            autocomplete="new-password"
            class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            :class="[message ? 'ring-rose-500 focus:ring-rose-500' : 'focus:ring-indigo-500']"
          >
        </form-item>

        <div
          v-auto-animate
          class="col-span-full flex"
        >
          <div v-if="openConfirm">
            <div class="space-x-3">
              <button
                class="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                @click="mutate({ input: { password: input.password } })"
              >
                Arrrgh, log me out!
              </button>

              <button
                class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                @click="openConfirm = false"
              >
                Cancel
              </button>
            </div>

            <p class="mt-4 text-sm text-gray-400">
              This will log you out of all other sessions across all of your devices. You will be logged out of this session as well.
            </p>
          </div>

          <button
            v-else
            type="submit"
            class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Log out other sessions
          </button>
        </div>
      </div>
    </form-instance>
  </studio-account-tab>
</template>

<script setup lang="ts">
import { Rules } from 'async-validator'
import { LogoutSessionsInput } from '~/apollo/__generated__/graphql'

const input = ref<LogoutSessionsInput>({
  password: ''
})

const rules = computed<Rules>(() => ({
  password: [
    { required: true, message: 'Please enter your current password' },
    { min: 8, message: 'Password must be at least 8 characters' }
  ]
}))

const openConfirm = refAutoReset(false, 10000)

const { mutate, loading, onDone } = useMutation(LogoutSessionsDocument)

onDone(() => {
  window.location.href = '/'
})
</script>

<style scoped>

</style>
