<template>
  <div class="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
    <div class="flex-none p-6 text-center">
      <img :src="value.imageUrl" alt="" class="mx-auto h-16 w-16 rounded-full">
      <h2 class="mt-3 font-semibold text-gray-900">
        {{ value.name }}
      </h2>
      <p class="text-sm leading-6 text-gray-500">
        {{ value.role }}
      </p>
    </div>
    <div class="flex flex-auto flex-col justify-between p-6">
      <dl class="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
        <dt class="col-end-1 font-semibold text-gray-900">
          Phone
        </dt>
        <dd>{{ value.phone }}</dd>
        <dt class="col-end-1 font-semibold text-gray-900">
          URL
        </dt>
        <dd class="truncate">
          <a :href="value.url" class="text-indigo-600 underline">
            {{ value.url }}
          </a>
        </dd>
        <dt class="col-end-1 font-semibold text-gray-900">
          Email
        </dt>
        <dd class="truncate">
          <a :href="`mailto:${value.email}`" class="text-indigo-600 underline">
            {{ value.email }}
          </a>
        </dd>
      </dl>
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
