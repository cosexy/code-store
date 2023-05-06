<template>
  <form-instance
    v-model:model="value"
    :rules="rules"
    class="mx-auto max-w-2xl py-6"
  >
    <div class="space-y-12">
      <div class="border-b border-white/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-white">
          Basic Information
        </h2>
        <p class="mt-1 text-sm leading-6 text-gray-400">
          This information will be displayed publicly so be careful what you share.
        </p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <form-item
            name="name"
            label="Name"
            class="sm:col-span-4"
          >
            <input
              id="name"
              v-model="value.name"
              type="text"
              name="name"
              autocomplete="name"
              placeholder="Product Name"
              class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            >
          </form-item>

          <form-item name="avatar" label="Avatar" class="col-span-full">
            <!-- flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10 -->
            <lazy-form-image
              v-slot="{ open, src, provider }"
              v-model:value="formImage"
              class="aspect-[6/4] h-64 cursor-pointer overflow-hidden rounded-lg border border-dashed border-white/25"
            >
              <div
                class="flex h-full w-full flex-col items-center justify-center"
                @click="open"
              >
                <nuxt-img v-if="src" :src="src" alt="" class="h-full w-full object-cover" :provider="provider" />
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
            </lazy-form-image>
          </form-item>

          <form-item
            name="description"
            label="Description"
            class="sm:col-span-full"
          >
            <textarea
              id="description"
              v-model="value.description"
              name="description"
              rows="4"
              class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
            <p class="mt-3 text-sm leading-6 text-gray-400">
              Give a brief description of your product.
            </p>
          </form-item>

          <form-item
            name="category"
            label="Category"
            class="sm:col-span-3"
          >
            <select
              id="category"
              v-model="value.category"
              name="category"
              class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
            >
              <option
                v-for="category in categories"
                :key="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </form-item>

          <form-item
            name="tags"
            label="Tags"
            class="sm:col-span-4"
          >
            <div
              v-if="form.tags.length"
              v-auto-animate
              class="mb-1.5 mt-3"
            >
              <button
                v-for="(tag, index) in form.tags"
                :key="tag"
                type="button"
                class="mb-3 mr-3 rounded bg-indigo-500 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                @click="removeTagBy(index)"
              >
                {{ tag }}
                <icon name="ic:outline-close" class="-mr-1 ml-1 inline-block h-3 w-3" />
              </button>
            </div>

            <input
              id="tags"
              v-model="tagInput"
              type="text"
              name="tags"
              autocomplete="tags"
              placeholder="Hit enter to add a tag"
              class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              @keydown.enter.prevent="addTag"
            >
          </form-item>
        </div>
      </div>

      <div class="border-b border-white/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-white">
          Pricing
        </h2>
        <p class="mt-1 text-sm leading-6 text-gray-400">
          Set a price for your product. It will be converted to the currency of the user.
          <br>
          The price of the extended lisences is calculated automatically.
        </p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <form-item
            v-slot="{ message }"
            label="Original price"
            name="price"
            class="sm:col-span-3"
          >
            <div
              class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset"
              :class="[message ? 'ring-rose-500 focus-within:ring-rose-500' : 'focus-within:ring-indigo-500']"
            >
              <span class="flex select-none items-center pl-3 text-gray-400 sm:text-sm">
                $
              </span>
              <input
                id="price"
                v-model="value.price"
                type="text"
                name="price"
                autocomplete="username"
                class="flex-1 border-0 bg-transparent py-1.5 pl-2 text-white focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="0.00"
              >
            </div>
          </form-item>

          <form-item
            v-slot="{ message }"
            label="Sale off"
            name="sale"
            class="sm:col-span-3"
          >
            <div
              class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset"
              :class="[message ? 'ring-rose-500 focus-within:ring-rose-500' : 'focus-within:ring-indigo-500']"
            >
              <span class="flex select-none items-center pl-3 text-gray-400 sm:text-sm">
                $
              </span>
              <input
                id="sale"
                v-model="value.sale"
                type="text"
                name="sale"
                autocomplete="username"
                class="flex-1 border-0 bg-transparent py-1.5 pl-2 text-white focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="0.00"
              >
            </div>
            <p class="mt-2 text-xs text-gray-400">
              Set empty to disable sale off
            </p>
          </form-item>
        </div>
      </div>

      <div class="border-b border-white/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-white">
          Extra options
        </h2>
        <p class="mt-1 text-sm leading-6 text-gray-400">
          Get notified about new orders, refunds, and more.
        </p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <form-item
            label="Highlights"
            name="highlights"
            class="sm:col-span-full"
          >
            <textarea
              id="description"
              ref="textarea"
              v-model="highlights"
              name="highlights"
              rows="3"
              class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
            <p class="mt-1 text-sm leading-6 text-gray-400">
              Enter each highlight on a new line.
            </p>
          </form-item>

          <form-item
            label="Lisence"
            name="lisence"
            class="sm:col-span-full"
          >
            <client-only>
              <lazy-form-editorjs v-model:value="form.lisence" />
            </client-only>
          </form-item>
        </div>
      </div>

      <div class="border-b border-white/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-white">
          Content
        </h2>
        <p class="mt-1 text-sm leading-6 text-gray-400">
          Specify the content of your product.
        </p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <form-item
            label="Lisence"
            name="lisence"
            class="sm:col-span-full"
          >
            <client-only>
              <lazy-form-editorjs v-model:value="form.lisence" />
            </client-only>
          </form-item>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" class="text-sm font-semibold leading-6 text-white">
        Cancel
      </button>
      <button type="submit" class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
        Save
      </button>
    </div>
  </form-instance>
</template>

<script setup lang="ts">
import { Rules } from 'async-validator'
import { CreateProductInput, ImageItemFragment } from '~/apollo/__generated__/graphql'

const props = defineProps<{
  form: CreateProductInput
}>()

/**
 * Define Form
 */
const emit = defineEmits<{
  (event: 'submit', value: CreateProductInput): void
  // v-model for form
  (event: 'update:form', value: CreateProductInput): void
}>()
const value = useVModel(props, 'form', emit)

const rules: Rules = {
  name: [
    { required: true, message: 'Please enter product name' },
    { min: 3, message: 'Product name must be at least 3 characters' }
  ],
  avatar: [
    { required: true, message: 'Please select product avatar' }
  ],
  description: [
    { required: true, message: 'Please enter product description' },
    { min: 3, message: 'Product description must be at least 3 characters' }
  ],
  category: [
    { required: true, message: 'Please select product category' }
  ],
  price: [
    { required: true, message: 'Please enter product price' },
    { type: 'number', message: 'Product price must be a number' },
    { min: 0, message: 'Product price must be greater than 0' }
  ],
  sale: [
    { type: 'number', message: 'Product sale must be a number' },
    { min: 0, message: 'Product sale must be greater than 0' },
    {
      asyncValidator: () => {
        // optional
        if (!value.value.sale) {
          return Promise.resolve()
        }
        if (value.value.sale >= value.value.price) {
          return Promise.reject(new Error('Product sale must be less than price'))
        }
      }
    }
  ]
}

const formImage = ref<Pick<ImageItemFragment, 'id' | 'path'>>({
  id: '',
  path: ''
})
watch(formImage, (val) => {
  if (val) {
    value.value.avatar = val.id
  }
})

/**
 * Category
 */
const { result } = useQuery(StudioCategoriesDocument)
const categories = computed(() => result.value?.categories ?? [])

/**
 * Tags
 */
const tagInput = ref('')

/**
 * If tagInput.value is not empty, and does not exist in tags (toLowerCase), add it to tags
 */
const addTag = () => {
  if (tagInput.value) {
    const tag = tagInput.value.toLowerCase()
    const index = value.value.tags.findIndex((e) => e.toLowerCase() === tag)
    if (index === -1) {
      value.value.tags.push(tag)
    }
    tagInput.value = ''
  }
}
const removeTagBy = (index: number) => {
  value.value.tags.splice(index, 1)
}

/**
 * Highlights
 */
const { textarea, input: highlights } = useTextareaAutosize()
</script>
