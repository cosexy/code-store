<template>
  <modal-base
    name="category"
    title="Modify category"
  >
    <form-instance
      :rules="rules"
      :value="form"
      @on-ok="submitForm"
    >
      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
        <form-item
          v-slot="{ message }"
          name="name"
          label="Name"
          class="col-span-full"
        >
          <input
            id="name"
            v-model="form.name"
            type="text"
            name="name"
            autocomplete="category-name"
            class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            :class="[message ? 'ring-rose-500 focus:ring-rose-500' : 'focus:ring-indigo-500']"
          >
        </form-item>

        <form-item name="avatar" label="Avatar" class="col-span-full">
          <form-file
            v-slot="{ open, provider }"
            v-model:value="imageInput"
            type="images"
            :config="{ accept: 'image/*', multiple: false }"
            class="aspect-[6/3] w-full cursor-pointer overflow-hidden rounded-lg border border-dashed border-white/25"
          >
            <div
              class="flex h-full w-full items-center justify-center"
              :class="{
                'flex-col': !imageInput.path
              }"
              @click="open"
            >
              <nuxt-img
                v-if="imageInput.path"
                :src="imageInput.path"
                alt=""
                class="h-full w-full object-cover"
                :provider="provider"
              />
              <template v-else>
                <icon name="ic:outline-add-photo-alternate" class="mx-auto h-12 w-12 text-gray-500" aria-hidden="true" />
                <div class="mt-4 flex text-sm leading-6 text-gray-400">
                  <div class="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500">
                    <span>Upload a file</span>
                  </div>
                </div>
                <p class="text-xs leading-5 text-gray-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </template>
            </div>
          </form-file>
        </form-item>

        <form-item
          v-slot="{ message }"
          name="description"
          label="Description"
          class="col-span-full"
        >
          <textarea
            id="description"
            ref="textarea"
            v-model="input"
            type="text"
            name="description"
            autocomplete="category-description"
            class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            :class="[message ? 'ring-rose-500 focus:ring-rose-500' : 'focus:ring-indigo-500']"
          />
        </form-item>
      </div>

      <div class="mt-6 flex justify-end space-x-3">
        <button
          class="inline-flex items-center gap-x-1.5 rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
        >
          Cancel
        </button>

        <button
          type="submit"
          class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add New
        </button>
      </div>
    </form-instance>
  </modal-base>
</template>

<script setup lang="ts">
import { Rules } from 'async-validator'
import { Ref } from 'vue'
import { CreateCategoryInput, Image } from '~/apollo/__generated__/graphql'

const form = ref<CreateCategoryInput>({
  avatar: '',
  description: '',
  name: ''
})
const rules = computed<Rules>(() => ({
  name: [
    { required: true, message: 'Please enter a name' },
    {
      string: {
        min: 3,
        max: 50,
        message: 'Name must be at least 3 characters and at most 50 characters'
      }
    }
  ],
  avatar: [
    { required: true, message: 'Please select an avatar' }
  ],
  description: [
    { required: true, message: 'Please enter a description' },
    {
      string: {
        min: 3,
        max: 500,
        message: 'Description must be at least 3 characters and at most 500 characters'
      }
    }
  ]
}))

const { textarea, input } = useTextareaAutosize()
watch(input, (value) => {
  form.value.description = value
})

const imageInput: Ref<Pick<Image, 'id' | 'path'>> = ref({
  id: '',
  path: ''
})
watch(imageInput, (value) => {
  if (value.path) {
    form.value.avatar = value.id
  }
})

const { close, onReceive, onClosed } = useDialog('category', {
  watch: true
})
onReceive((category) => {
  if (category) {
    form.value = {
      avatar: category.avatar?.id ?? '',
      description: category.description ?? '',
      name: category.name
    }
    input.value = category.description ?? ''
    imageInput.value = {
      id: category.avatar?.id ?? '',
      path: category.avatar?.path ?? ''
    }
  } else {
    form.value = {
      avatar: '',
      description: '',
      name: ''
    }
    input.value = ''
    imageInput.value = {
      id: '',
      path: ''
    }
  }
})

const { mutate: createCategory } = useMutation(CreateCategoryDocument)
const submitForm = () => {
  createCategory({
    input: form.value
  })
  close()
}

const loading = useMutationLoading()
</script>

<style scoped>

</style>
