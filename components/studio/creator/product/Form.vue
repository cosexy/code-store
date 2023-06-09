<template>
  <form-instance
    v-model:value="value"
    :rules="rules"
    class="mx-auto max-w-4xl py-6"
    @on-ok="onOk"
    @on-error="onError"
  >
    <div class="space-y-12">
      <studio-creator-product-section
        title="Basic Information"
        description="This information will be displayed publicly so be careful what you share."
      >
        <form-item
          name="name"
          label="Name"
          class="sm:col-span-4"
        >
          <input
            id="name"
            v-model="value.name"
            type="text"
            name="product-name"
            autocomplete="product-name"
            placeholder="Name"
            class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          >
        </form-item>

        <form-item name="avatar" label="Avatar" class="col-span-full">
          <form-file
            v-slot="{ open, provider }"
            v-model:value="imageInput"
            type="images"
            :config="{ accept: 'image/*', multiple: false }"
            class="aspect-[6/4] h-64 cursor-pointer overflow-hidden rounded-lg border border-dashed border-white/25"
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
          name="description"
          label="Description"
          extra="Give a brief description of your product."
          class="sm:col-span-full"
        >
          <textarea
            id="description"
            v-model="value.description"
            name="description"
            rows="4"
            class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          />
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
              :value="category.id"
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
              @click="removeTagBy(index as number)"
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

        <form-item
          label="Highlights"
          name="highlights"
          class="sm:col-span-5"
          extra="Enter each highlight on a new line."
        >
          <textarea
            id="highlights"
            ref="textarea"
            v-model="highlights"
            name="highlights"
            rows="3"
            class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          />
        </form-item>
      </studio-creator-product-section>

      <studio-creator-product-section
        title="Pricing"
        description=""
      >
        <template #description>
          <p class="mt-1 text-sm leading-6 text-gray-400">
            Set a price for your product. It will be converted to the currency of the user.
            <br>
            The price of the extended lisences is calculated automatically.
          </p>
        </template>

        <form-item
          label="Original price"
          prefix="$"
          name="price"
          class="sm:col-span-3"
        >
          <input
            id="price"
            v-model.number="value.price"
            type="text"
            name="price"
            autocomplete="username"
            class="flex-1 border-0 bg-transparent py-1.5 pl-2 text-white focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="0.00"
          >
        </form-item>

        <form-item
          label="Sale off"
          name="sale"
          class="sm:col-span-3"
          prefix="$"
          extra="Set empty to disable sale off"
        >
          <input
            id="sale"
            v-model.number="value.sale"
            type="text"
            name="sale"
            autocomplete="username"
            class="flex-1 border-0 bg-transparent py-1.5 pl-2 text-white focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="0.00"
          >
        </form-item>
      </studio-creator-product-section>

      <studio-creator-product-section
        title="Resources"
        description="Upload your product files. You can upload multiple files at once."
      >
        <form-file
          v-slot="{ open }"
          v-model:value="documentInput"
          type="documents"
          :config="{ accept: '.zip,.rar,.7zip', multiple: false }"
          class="sm:col-span-4"
        >
          <form-item
            name="document"
            label="Document"
            class="sm:col-span-3"
            extra="Provide a document for your product. It will be downloaded by the user after purchasing."
            @click="open"
          >
            <template #prefix>
              <icon size="18" name="material-symbols:upload-rounded" />
            </template>
            <input
              id="document"
              readonly
              type="text"
              name="product-version"
              autocomplete="product-version"
              :placeholder="documentInputLable"
              class="flex-1 cursor-pointer border-0 bg-transparent py-1.5 pl-2 text-white focus:ring-0 sm:text-sm sm:leading-6"
            >
          </form-item>
        </form-file>

        <form-item
          name="version"
          label="Version"
          class="sm:col-span-2"
        >
          <input
            id="version"
            v-model="value.version"
            type="text"
            name="product-version"
            autocomplete="product-version"
            placeholder="xxx.xxx.xxx"
            class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          >
        </form-item>

        <form-item
          name="preview"
          label="Preview"
          class="sm:col-span-full"
          extra="Provide a preview for your product. It will be shown on the product page."
        >
          <input
            id="preview"
            v-model="value.preview"
            type="text"
            name="preview-version"
            autocomplete="product-version"
            placeholder="https://example.com/preview"
            class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          >
        </form-item>

        <form-item
          label="Lisence"
          name="lisence"
          class="sm:col-span-full"
        >
          <client-only>
            <lazy-form-editor v-model:value="value.lisence" :config="{ height: '500px' }" />
          </client-only>
        </form-item>
      </studio-creator-product-section>

      <studio-creator-product-section
        title="Content"
        description="Specify the content of your product."
      >
        <form-item
          label="Content"
          name="content"
          class="sm:col-span-full"
        >
          <client-only>
            <lazy-form-editor v-model:value="value.content" :config="{ height: '1000px' }" />
          </client-only>
        </form-item>
      </studio-creator-product-section>
    </div>
  </form-instance>
</template>

<script setup lang="ts">
import { Rules } from 'async-validator'
import { Ref } from 'vue'
import { CreateProductInput, Image, Document } from '~/apollo/__generated__/graphql'

const props = defineProps<{
  form: CreateProductInput | any,
  initData?: {
    image?: Pick<Image, 'id' | 'path'>
    document?: Pick<Document, 'id' | 'path'>
    highlights?: string
  } | any
}>()

/**
 * Define Form
 */
const emit = defineEmits<{
  (event: 'onSubmit', value: CreateProductInput): void
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
    {
      type: 'number',
      message: 'Product price must be a number and greater than 0',
      min: 0
    }
  ],
  sale: [
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
  ],
  version: [
    {
      required: true,
      message: 'Please enter product version'
    },
    {
      pattern: /^\d+(?:\.\d+){0,2}$/,
      message: 'Product version must be in the format ^\\d+(?:\\.\\d+){0,2}$'
    }
  ],
  document: [
    {
      required: true,
      message: 'Please select product document'
    }
  ],
  preview: [
    {
      pattern: /^(http|https):\/\/[^ "]+$/,
      message: 'Product preview must be a valid url'
    }
  ]
}

const imageInput: Ref<Pick<Image, 'id' | 'path'>> = ref(props.initData?.image ?? {
  id: '',
  path: ''
})
const documentInput: Ref<Pick<Document, 'id' | 'path'>> = ref(props.initData?.document ?? {
  id: '',
  path: ''
})
const documentInputLable = computed(() => {
  if (documentInput.value.path) {
    return documentInput.value.path.split('/').pop()
  }
  return 'Click to select a file'
})

watch(imageInput, (val) => {
  if (val) {
    value.value.avatar = val.id
  }
})
watch(documentInput, (val) => {
  if (val) {
    value.value.document = val.id
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
 * If tagInput is not empty, and does not exist in tags (toLowerCase), add it to tags
 */
const addTag = () => {
  if (tagInput.value) {
    const tag = tagInput.value.toLowerCase()
    const index = value.value.tags.findIndex((e: string) => e.toLowerCase() === tag)
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
if (props.initData?.highlights) {
  // eslint-disable-next-line vue/no-setup-props-destructure
  highlights.value = props.initData.highlights
}

watch(highlights, (val) => {
  if (val) {
    value.value.highlights = val.split('\n').filter((e) => e).map((e) => e.trim())
  }
})

const onOk = () => emit('onSubmit', value.value)

const onError = () => {
  // console.log('error')
}
</script>
