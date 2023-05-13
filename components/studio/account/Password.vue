<template>
  <studio-account-tab
    name="Change password"
    subject="Update your password associated with your account"
  >
    <form-instance
      class="md:col-span-2"
      :value="input"
      :rules="rules"
      @on-ok="submitForm"
    >
      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
        <form-item
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

        <form-item
          v-slot="{ message }"
          name="newPassword"
          label="New password"
          class="col-span-full"
        >
          <input
            id="newPassword"
            v-model="input.newPassword"
            type="password"
            name="newPassword"
            autocomplete="new-password"
            class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            :class="[message ? 'ring-rose-500 focus:ring-rose-500' : 'focus:ring-indigo-500']"
          >
        </form-item>

        <form-item
          v-slot="{ message }"
          name="rePassword"
          label="Confirm password"
          class="col-span-full"
        >
          <input
            id="rePassword"
            v-model="input.rePassword"
            type="password"
            name="rePassword"
            autocomplete="new-password"
            class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            :class="[message ? 'ring-rose-500 focus:ring-rose-500' : 'focus:ring-indigo-500']"
          >
        </form-item>
      </div>

      <div class="mt-8 flex">
        <button type="submit" class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
          Save
        </button>
      </div>
    </form-instance>
  </studio-account-tab>
</template>

<script setup lang="ts">
import type { Rules } from 'async-validator'
const input = ref({
  password: '',
  newPassword: '',
  rePassword: ''
})

const rules = computed<Rules>(() => ({
  password: [
    { required: true, message: 'Please enter your current password' },
    { min: 8, message: 'Password must be at least 8 characters' }
  ],
  newPassword: [
    { required: true, message: 'Please enter your new password' },
    { min: 8, message: 'Password must be at least 8 characters' }
  ],
  rePassword: [
    { required: true, message: 'Please enter your new password again' },
    { min: 8, message: 'Password must be at least 8 characters' },
    {
      validator: (rule, value, callback) => {
        if (value !== input.value.newPassword) {
          callback(new Error('Password does not match'))
        } else {
          callback()
        }
      }
    }
  ]
}))

const { loading, mutate, onDone } = useMutation(UpdatePasswordDocument)

onDone(() => {
  input.value.password = ''
  input.value.newPassword = ''
  input.value.rePassword = ''
})

const submitForm = () => mutate({
  input: {
    password: input.value.password,
    newPassword: input.value.newPassword
  }
})
</script>

<style scoped>

</style>
