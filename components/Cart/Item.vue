<template>
  <li class="flex py-6">
    <div class="aspect-w-6 aspect-h-4 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
      <nuxt-img :src="item.product.avatar.path" :alt="item.product.name" provider="backend" class="h-full w-full object-cover object-center" />
    </div>

    <div class="ml-4 flex flex-1 flex-col">
      <div>
        <div class="flex justify-between text-base font-medium text-gray-900">
          <h3>
            <a href="#">
              {{ item.product.name }}
            </a>
          </h3>
          <p class="ml-4">
            {{ item.product.price }}
          </p>
        </div>
        <p class="mt-1 text-sm text-gray-500">
          1234
        </p>
      </div>
      <div class="flex flex-1 items-end justify-between text-sm">
        <p class="text-gray-500">
          Qty 12
        </p>

        <div class="flex">
          <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500">
            Remove
          </button>
        </div>
      </div>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { GetCart_cart } from '~/apollo/queries/__generated__/GetCart'

defineProps<{
  item: GetCart_cart
}>()
</script>

<style scoped></style>
