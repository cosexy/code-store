<template>
  <studio-account-tab
    name="Personal Information"
    subject="Use a permanent address where you can receive mail."
  >
    <form-instance v-model:value="input" :rules="rules" class="md:col-span-2">
      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
        <form-image
          v-model:value="input.avatar"
          v-model:image="imageForm"
          class="col-span-full flex items-center gap-x-8"
        >
          <template #default="{ src, provider, open }">
            <nuxt-img
              :src="src"
              alt=""
              class="h-24 w-24 flex-none cursor-pointer rounded-lg bg-gray-800 object-cover"
              :provider="provider"
              @click="open"
            />
            <div>
              <button
                type="button"
                class="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                @click="open"
              >
                Change avatar
              </button>
              <p class="mt-2 text-xs leading-5 text-gray-400">
                JPG, GIF or PNG. 10MB max.
              </p>
            </div>
          </template>
        </form-image>

        <form-item name="name" label="Full name" class="col-span-full">
          <input
            id="name"
            v-model="input.name"
            type="text"
            name="name"
            autocomplete="name"
            class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          >
        </form-item>

        <div class="col-span-full">
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-white"
          >
            Email address
          </label>
          <div class="mt-2">
            <input
              id="email"
              v-model="input.email"
              name="email"
              type="email"
              autocomplete="email"
              class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            >
          </div>
        </div>

        <div class="col-span-full">
          <label
            for="username"
            class="block text-sm font-medium leading-6 text-white"
          >
            Username
          </label>
          <div class="mt-2">
            <div
              class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
            >
              <span class="flex select-none items-center pl-3 text-gray-400 sm:text-sm">
                code.guen.dev/
              </span>
              <input
                id="username"
                v-model="input.slug"
                type="text"
                name="username"
                autocomplete="username"
                class="flex-1 border-0 bg-transparent py-1.5 pl-0 text-white focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="janesmith"
              >
            </div>
          </div>
        </div>

        <div class="col-span-full">
          <label
            for="occupation"
            class="block text-sm font-medium leading-6 text-white"
          >
            Occupation
          </label>
          <div class="mt-2">
            <select
              id="occupation"
              name="occupation"
              class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
            >
              <option
                v-for="occupation in occupations"
                :key="occupation"
              >
                {{ occupation }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="mt-8 flex">
        <button
          v-auto-animate
          type="submit"
          class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          :disabled="loading"
        >
          <icon v-if="loading" name="line-md:loading-twotone-loop" class="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Update Information
        </button>
      </div>
    </form-instance>
  </studio-account-tab>
</template>

<script setup lang="ts">
import { Ref } from 'vue'
import { ImageItemFragment, UpdateUserInput } from '~/apollo/__generated__/graphql'
import { FormRule } from '~/entities/form.entity'

const authStore = useAuth()

const input: Ref<UpdateUserInput> = ref({
  avatar: '',
  email: '',
  name: '',
  occupation: '',
  slug: ''
})
const imageForm: Ref<Pick<ImageItemFragment, 'id' | 'path'>> = ref({
  id: '',
  path: ''
})

const insertForm = () => {
  ['avatar', 'email', 'name', 'occupation', 'slug'].forEach((key) => {
    input.value[key] = authStore.user?.[key]
  })
}
insertForm()

const rules = computed<Record<string, FormRule>>(() => ({}))

// List of occupations related to ID insdustry
const occupations = computed(() => ['Designer', 'Developer', 'Product Manager', 'Data Scientist', 'Other'])

const { mutate, loading } = useMutation(UpdateMeDocument)
</script>

<style scoped>

</style>
