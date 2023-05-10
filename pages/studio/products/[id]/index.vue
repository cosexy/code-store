<template>
  <studio-tabs :tabs="tabs">
    <headless-tab-panel>
      <includes-spinner :spinning="loading">
        <studio-creator-product-form
          id="form-studio"
          v-model:form="input"
          :init-data="initData"
          @on-submit="submitForm($event)"
        />
      </includes-spinner>

      <includes-teleport to="#actions">
        <div class="space-x-4">
          <button
            form="form-studio"
            class="inline-flex items-center gap-x-1.5 rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <icon
              :name="loading ? 'line-md:loading-twotone-loop' : 'material-symbols:delete-outline-rounded'"
              class="-ml-0.5 h-5 w-5"
              aria-hidden="true"
            />
            Delete
          </button>

          <button
            form="form-studio"
            type="submit"
            class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <icon
              :name="loading ? 'line-md:loading-twotone-loop' : 'material-symbols:fitbit-check-small-rounded'"
              class="-ml-0.5 h-5 w-5"
              aria-hidden="true"
            />
            Update
          </button>
        </div>
      </includes-teleport>
    </headless-tab-panel>
  </studio-tabs>
</template>

<script setup lang="ts" async>
import { CreateProductInput, Document, Image, ProductInformationDocument } from '~/apollo/__generated__/graphql'

const tabs = computed(() => ['Information', 'Analytics', 'Lisences', 'Reviews'])

const input = ref<CreateProductInput>({
  avatar: '',
  category: '',
  content: '',
  description: '',
  highlights: [],
  lisence: '',
  name: '',
  price: 0,
  sale: undefined,
  tags: [],
  version: '',
  document: ''
})

const route = useRoute()

const { result, onResult } = await useAsyncQuery(ProductInformationDocument, {
  filter: {
    slug: route.params.id as string
  }
})

const initData = ref<{
  image?: Pick<Image, 'id' | 'path'>
  document?: Pick<Document, 'id' | 'path'>
  highlights?: string
}>({})

if (result.value?.product) {
  input.value = {
    avatar: result.value?.product.avatar.id,
    category: result.value?.product.category.id,
    content: result.value?.product.content,
    description: result.value?.product.description,
    highlights: result.value?.product.highlights,
    lisence: result.value?.product.license,
    name: result.value?.product.name,
    price: result.value?.product.price,
    sale: result.value?.product.sale,
    tags: result.value?.product.tags.map((tag) => tag.name),
    version: result.value?.product.version,
    document: result.value?.product.document.id
  }

  initData.value = {
    image: {
      id: result.value?.product.avatar.id,
      path: result.value?.product.avatar.path
    },
    document: {
      id: result.value?.product.document.id,
      path: result.value?.product.document.path
    },
    highlights: result.value?.product.highlights.join('\n')
  }
}
/**
 * Submit form
 */
const { mutate, loading } = useMutation(CreateProductDocument)

const submitForm = (value: CreateProductInput) => {
  console.log(value)
  mutate({ input: input.value })
}
</script>

<style scoped>

</style>
