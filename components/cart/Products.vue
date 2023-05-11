<template>
  <section aria-labelledby="cart-heading">
    <h2 id="cart-heading" class="sr-only">
      Items in your shopping cart
    </h2>

    <ul role="list" class="divide-y divide-gray-200 border-y border-gray-200">
      <cart-product v-for="product in products" :key="product.id" :item="product" />
    </ul>
  </section>
</template>

<script setup lang="ts">
import { GetCartQuery } from '~/apollo/__generated__/graphql'

defineProps<{
  products: GetCartQuery['cart']
}>()
</script>

<style scoped>

</style>
