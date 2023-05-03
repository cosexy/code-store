<template>
  <section aria-labelledby="summary-heading" class="bg-indigo-900 py-12 text-indigo-300 md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:bg-transparent lg:px-0 lg:pb-24 lg:pt-0">
    <div class="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
      <h2 id="summary-heading" class="sr-only">
        Order summary
      </h2>

      <dl>
        <dt class="text-sm font-medium">
          Amount due
        </dt>
        <dd class="mt-1 text-3xl font-bold tracking-tight text-white">
          ${{ discount }}
        </dd>
      </dl>

      <ul role="list" class="divide-y divide-white divide-opacity-10 text-sm font-medium">
        <checkout-product-item v-for="item in cart" :key="item.id" :item="item" />
      </ul>

      <dl class="space-y-6 border-t border-white border-opacity-10 pt-6 text-sm font-medium">
        <div class="flex items-center justify-between">
          <dt>Subtotal</dt>
          <dd>${{ original }}</dd>
        </div>

        <div class="flex items-center justify-between">
          <dt>Discount</dt>
          <del>
            ${{ savings }}
          </del>
        </div>

        <div class="flex items-center justify-between">
          <dt>Fee</dt>
          <dd>${{ fee }}</dd>
        </div>

        <div class="flex items-center justify-between border-t border-white border-opacity-10 pt-6 text-white">
          <dt class="text-base">
            Total
          </dt>
          <dd class="text-base">
            ${{ final }}
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { CartItemFragment } from '~/apollo/__generated__/graphql'

const props = defineProps<{
  cart: CartItemFragment[]
}>()

const emits = defineEmits<{
  (event: 'update:cart', value: CartItemFragment[]): void
}>()

const value = useVModel(props, 'cart', emits)

const { original, discount, fee, final, savings } = useCart(props.cart)
</script>

<style scoped></style>
