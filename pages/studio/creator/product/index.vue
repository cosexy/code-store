<template>
  <div>
    <includes-spinner :spinning="loading">
      <studio-creator-product-form
        id="form-studio"
        v-model:form="input"
        @on-submit="submitForm($event)"
      />
    </includes-spinner>

    <includes-teleport to="#actions">
      <button
        form="form-studio"
        type="submit"
        class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <icon
          :name="loading ? 'line-md:loading-twotone-loop' : 'material-symbols:add-rounded'"
          class="-ml-0.5 h-5 w-5"
          aria-hidden="true"
        />
        Create
      </button>
    </includes-teleport>
  </div>
</template>

<script setup lang="ts">
import { CreateProductInput } from '~/apollo/__generated__/graphql'

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
  document: '',
  version: '',
  preview: ''
})

const { mutate, loading } = useMutation(CreateProductDocument)

const submitForm = (value: CreateProductInput) => {
  console.log(value)
  mutate({ input: input.value })
}
</script>

<style scoped>

</style>
