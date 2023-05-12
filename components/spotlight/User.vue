<template>
  <div class="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
    <div class="flex-none p-6 text-center">
      <nuxt-img
        :src="value.avatar?.path || '/images/user.png'"
        :provider="value.avatar?.path ? 'backend' : ''"
        class="mx-auto h-16 w-16 rounded-full"
      />
      <h2 class="mt-3 font-semibold text-gray-900">
        {{ value.name }}
      </h2>
      <div class="mt-3 space-x-2">
        <button
          type="button"
          class="rounded bg-green-600 px-2 py-1 text-xs font-semibold lowercase text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          <icon name="material-symbols:admin-panel-settings-outline-rounded" />
          {{ value.role }}
        </button>

        <button
          type="button"
          class="rounded bg-orange-600 px-2 py-1 text-xs font-semibold lowercase text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          <icon name="ph:chat-circle-text" />
          {{ value.countReview }}
        </button>

        <button
          type="button"
          class="rounded bg-purple-600 px-2 py-1 text-xs font-semibold lowercase text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
        >
          <icon name="octicon:package-16" />
          {{ value.countProduct }}
        </button>
      </div>
    </div>
    <div class="flex flex-auto flex-col justify-between p-6">
      <dl class="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
        <dt class="col-end-1 font-semibold text-gray-900">
          Occupation
        </dt>
        <dd>{{ value.occupation }}</dd>
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
        Go to profile
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SpotlightQuery } from '~/apollo/__generated__/graphql'

defineProps<{
    value: SpotlightQuery['users'][0]
}>()
</script>

<style scoped>

</style>
