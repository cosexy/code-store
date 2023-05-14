<template>
  <includes-spinner :spinning="loading">
    <studio-creator-product-form
      id="form-studio"
      v-model:form="input"
      :init-data="initData"
      @on-submit="submitForm()"
    />
  </includes-spinner>

  <includes-teleport to="#actions">
    <div class="space-x-4">
      <headless-popover class="relative" as="templete">
        <headless-popover-button>
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
        </headless-popover-button>
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="translate-y-1 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="translate-y-1 opacity-0"
        >
          <headless-popover-panel
            v-slot="{ close }"
            class="absolute right-0 z-10 mt-3 w-[380px] overflow-hidden rounded-md shadow"
          >
            <div class="space-y-3 bg-gray-700 p-3 text-white">
              <div class="flex items-center space-x-1.5">
                <icon name="ph:seal-warning-fill" />
                <span>Are you sure you want to delete this product?</span>
              </div>

              <div class="flex justify-end space-x-2">
                <button
                  type="button"
                  class="rounded bg-white/10 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-white/20"
                  @click="close"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="rounded bg-indigo-500 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  @click="remove({ input: { id: $route.params.id } })"
                >
                  Remove
                </button>
              </div>
            </div>
          </headless-popover-panel>
        </transition>
      </headless-popover>

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
</template>

<script setup lang="ts">
import {
  CreateProductInput,
  Document,
  Image,
  ProductInformationQuery, UpdateProductDocument
} from '~/apollo/__generated__/graphql'

const props = defineProps<{
    product: ProductInformationQuery['studioProduct']
}>()

const input = ref<CreateProductInput>({
  avatar: props.product.avatar.id,
  category: props.product.category.id,
  content: props.product.content,
  description: props.product.description,
  highlights: props.product.highlights,
  lisence: props.product.license,
  name: props.product.name,
  price: props.product.price,
  sale: props.product.sale,
  tags: props.product.tags.map((tag) => tag.name),
  version: props.product.version,
  document: props.product.document.id,
  preview: props.product.preview
})

const initData = ref<{
    image: Pick<Image, 'id' | 'path'>
    document: Pick<Document, 'id' | 'path'>
    highlights: string
}>({
  image: {
    id: props.product.avatar.id,
    path: props.product.avatar.path
  },
  document: {
    id: props.product.document.id,
    path: props.product.document.path
  },
  highlights: props.product.highlights.join('\n')
})
/**
 * Submit form
 */
const { mutate, loading } = useMutation(UpdateProductDocument)

const submitForm = () => mutate(
  {
    input: {
      ...input.value,
      id: props.product.id
    }
  }
)

/**
 * Remove
 */
const { mutate: remove, loading: removeLoading } = useMutation(RemoveProductDocument)
</script>

<style scoped>

</style>
