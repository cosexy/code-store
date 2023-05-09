<template>
  <div>
    <studio-creator-product-form v-model:form="input" @on-submit="submitForm($event)" />
  </div>
</template>

<script setup lang="ts">
import { CreateProductInput } from '~/apollo/__generated__/graphql'

const input = ref<CreateProductInput>({
  avatar: '',
  category: '',
  content: {},
  description: '',
  highlights: [],
  lisence: {},
  name: '',
  price: 0,
  sale: undefined,
  tags: []
})

const { mutate, loading } = useMutation(CreateProductDocument)

const submitForm = (value: CreateProductInput) => {
  console.log(value)
  mutate({ input: input.value })
}
</script>

<style scoped>

</style>
