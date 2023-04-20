<template>
  <div class="lg:col-span-4 lg:row-end-1">
    <div class="aspect-w-6 aspect-h-4 overflow-hidden rounded-lg bg-gray-100">
      <nuxt-img :src="product.avatar.path" :alt="product.name" class="object-cover object-center" provider="backend" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GetProduct_product } from '~/apollo/queries/__generated__/GetProduct'

defineProps<{
  product: Pick<GetProduct_product, 'id' | 'avatar' | 'name'>
}>()
</script>

<style scoped></style>
