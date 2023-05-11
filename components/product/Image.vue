<template>
  <div class="lg:col-span-4 lg:row-end-1">
    <div class="aspect-product overflow-hidden rounded-lg bg-gray-100">
      <nuxt-img
        :src="product.avatar.path"
        :alt="product.name"
        class="h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-105"
        provider="backend"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>

import { GetProductQuery } from '~/apollo/__generated__/graphql'

defineProps<{
  product: Pick<GetProductQuery['product'], 'name' | 'avatar'>
}>()
</script>

<style scoped></style>
