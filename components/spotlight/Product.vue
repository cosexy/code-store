<template>
  <div class="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
    <div class="flex-none p-6 text-center">
      <nuxt-img
        :src="value.avatar!.path"
        provider="backend"
        class="aspect-product mx-auto h-20 rounded-md"
      />
      <h2 class="mt-3 line-clamp-2 font-semibold text-gray-900">
        {{ value.name }}
      </h2>
      <button type="button" class="mt-1  rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        {{ value.category.name }}
      </button>
    </div>
    <div class="flex flex-auto flex-col justify-between p-6">
      <div class="prose">
        <p class="line-clamp-4 text-sm text-gray-600">
          {{ value.description }}
        </p>
      </div>
      <button type="button" class="mt-6 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Send message
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SpotlightQuery } from '~/apollo/__generated__/graphql'

defineProps<{
    value: SpotlightQuery['products'][0]
}>()
</script>

<style scoped>

</style>
