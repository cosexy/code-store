<template>
  <div class="bg-white">
    <checkout-empty />

    <div v-if="false">
      <div class="fixed left-0 top-0 hidden h-full w-1/2 bg-white lg:block" aria-hidden="true" />
      <div class="fixed right-0 top-0 hidden h-full w-1/2 bg-indigo-900 lg:block" aria-hidden="true" />

      <div class="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 lg:pt-16">
        <h1 class="sr-only">
          Checkout
        </h1>
        <checkout-sumary :cart="cart" />
        <checkout-form :cart="cart" />
      </div>
    </div>
  </div>
</template>

<script setup async lang="ts">
import { CartItemFragment, GetCartDocument } from '~/apollo/__generated__/graphql'

const { result } = await useAsyncQuery(GetCartDocument)
const cart = computed<CartItemFragment[]>(() => result?.value?.cart || [])

watch(cart, () => {
  // console.log(cart.value)
})
</script>
