<template>
  <div class="flex space-x-4 text-sm text-gray-500">
    <div class="flex-none py-10">
      <div class="h-10 w-10 overflow-hidden rounded-full bg-gray-100">
        <nuxt-img :provider="review.user.avatar?.path ? 'backend' : ''" :src="review.user.avatar?.path || '/images/avatar.jpg'" alt="" />
      </div>
    </div>
    <div class="_content w-full space-y-1 py-10">
      <h3 class="font-medium text-gray-900">
        {{ review.user.name }}
      </h3>

      <p>
        <includes-time-tag
          :timestamp="review.createdAt"
        >
          <template #default="{ date }">
            {{ date.format('MMMM D, YYYY') }}
          </template>
        </includes-time-tag>
      </p>

      <div>
        <div class="-ml-1 flex items-center">
          <Icon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" name="ic:round-star-rate" :class="[review.rate >= rating ? 'text-yellow-400' : 'text-gray-300', 'h-5 w-5 shrink-0']" aria-hidden="true" />
        </div>
        <p class="sr-only">
          {{ review.rate }} out of 5 stars
        </p>
      </div>

      <div class="prose prose-sm max-w-none text-gray-500">
        {{ review.content }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ReviewsQuery } from '~/apollo/__generated__/graphql'

const props = defineProps<{
  review: ReviewsQuery['reviews'][0]
}>()
</script>

<style scoped>

</style>
