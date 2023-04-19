<template>
  <div class="shadow-default group relative overflow-hidden rounded-md">
    <div class="aspect-w-6 aspect-h-4 overflow-hidden bg-gray-100">
      <nuxt-img :src="product.avatar.path" class="object-cover object-center" provider="backend" />
      <div class="flex items-end p-4 opacity-0 transition group-hover:opacity-100">
        <button class="bg-primary w-full rounded-md px-4 py-2 text-center text-sm font-medium text-white">
          View Product
        </button>
      </div>
    </div>

    <div class="space-y-2 px-4 py-3 leading-5">
      <h3 class="font-semibold">
        <a href="#">
          {{ product.name }}
        </a>
      </h3>

      <div class="flex items-center justify-between">
        <p class="font-semibold text-rose-500">
          $ {{ product.price }}
        </p>

        <button class="from-primary-500 to-primary-600  shadow-primary-300 rounded-md bg-gradient-to-r px-3 py-1 text-sm font-semibold text-white shadow-md">
          Buy Now
        </button>
      </div>
    </div>

    <span class="bg-primary shadow-default shadow-primary-300 absolute left-0 top-0 rounded-br-md px-3 py-1 text-sm text-white">
      {{ product.category.name }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { GetProducts_products } from '~/apollo/queries/__generated__/GetProducts'

defineProps<{
  product: GetProducts_products
}>()
</script>

<style scoped></style>
