<template>
  <div class="shadow-default group relative overflow-hidden rounded-md">
    <div class="aspect-w-6 aspect-h-4 overflow-hidden bg-gray-100">
      <nuxt-img :src="product.avatar.path" class="object-cover object-center" provider="backend" />
      <div class="flex items-end p-4 opacity-0 transition group-hover:opacity-100" aria-hidden="true">
        <div class="bg-primary shadow-default shadow-primary-300 w-full rounded-md px-4 py-2 text-center text-sm font-medium text-white">
          View Product
        </div>
      </div>
    </div>

    <div class="px-4 py-3">
      <div class="flex justify-between space-x-8 text-base font-medium text-gray-900">
        <h3 class="mb-0">
          <a href="#">
            <span aria-hidden="true" class="absolute inset-0" />
            {{ product.name }}
          </a>
        </h3>
        <p class="shrink-0">
          $ {{ product.price }}
        </p>
      </div>
      <!--      <p class="mt-1 text-sm text-gray-500">-->
      <!--        {{ product.category.name }}-->
      <!--      </p>-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GetProducts_products } from '~/apollo/queries/__generated__/GetProducts'

defineProps<{
  product: GetProducts_products
}>()
</script>

<style scoped></style>
