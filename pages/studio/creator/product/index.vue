<template>
  <div>
    <includes-spinner :spinning="loading">
      <studio-creator-product-form
        v-model:form="input"
        @on-submit="submitForm($event)"
      />
    </includes-spinner>
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
  version: ''
})

const { mutate, loading } = useMutation(CreateProductDocument)

const submitForm = (value: CreateProductInput) => {
  console.log(value)
  mutate({ input: input.value })
}
</script>

<style scoped>

</style>
