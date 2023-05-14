<template>
  <tr class="text-sm text-gray-400">
    <!-- Avatar -->
    <th scope="col">
      <div
        class="aspect-product block h-[100px] overflow-hidden rounded-md"
      >
        <nuxt-img
          :src="category.avatar.path"
          provider="backend"
          class="h-full w-full object-cover transition hover:scale-105"
        />
      </div>
    </th>

    <!-- Name -->
    <th scope="col" class="whitespace-pre-line font-medium">
      {{ category.name }}
    </th>

    <!-- Description -->
    <th scope="col" class="whitespace-pre-line font-medium">
      {{ category.description }}
    </th>

    <th scope="col" class="hidden py-2 pl-0 pr-4 text-right font-normal sm:table-cell sm:pr-6 lg:pr-8">
      <div class="space-x-2">
        <includes-confirm
          message="Are you sure ?"
        >
          <button
            type="button"
            class="rounded bg-rose-500 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
          >
            Remove
          </button>
        </includes-confirm>
        <button
          type="button"
          class="rounded bg-indigo-500 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          @click="open(category)"
        >
          Edit
        </button>
      </div>
    </th>
  </tr>
</template>

<script setup lang="ts">
import { StudioCategoriesQuery } from '~/apollo/__generated__/graphql'

const props = defineProps<{
    category: StudioCategoriesQuery['categories'][0]
}>()

const { open } = useDialog<StudioCategoriesQuery['categories'][0]>('category')
</script>

<style scoped>
tr th:first-child {
    @apply pl-4 pr-8 sm:pl-6 lg:pl-8
}

th {
    @apply py-3
}
</style>
