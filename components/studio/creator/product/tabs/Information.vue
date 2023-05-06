<template>
  <div>
    <studio-creator-product-form v-model:form="input" />
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
</script>

<style scoped>

</style>
