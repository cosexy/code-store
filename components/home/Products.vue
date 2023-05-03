<template>
  <div class="section-spacing">
    <div class="flex items-center justify-between space-x-4">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900">
        Products
      </h2>
      <a href="#" class="whitespace-nowrap text-sm font-medium text-indigo-600 hover:text-indigo-500">
        View all
        <span aria-hidden="true"> &rarr;</span>
      </a>
    </div>
    <div class="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
      <products-item v-for="product in products" :key="product.id" :product="product" class="group relative" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { GetProductsDocument } from '~/apollo/__generated__/graphql'

const {
  result
} = useQuery(GetProductsDocument, {
  filter: {
    limit: 8,
    offset: 0,
    sort: 'createdAt'
  }
})

const products = computed(() => result.value?.products || [])
</script>
