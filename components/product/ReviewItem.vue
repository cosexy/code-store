<template>
  <div class="flex space-x-4 text-sm text-gray-500">
    <div class="flex-none py-10">
      <div class="h-10 w-10 rounded-full bg-gray-100">
        <nuxt-img provider="backend" :src="review.avatarSrc" alt="">
      </div>
    </div>
    <div :class="[reviewIdx === 0 ? '' : 'border-t border-gray-200', 'py-10']">
      <h3 class="font-medium text-gray-900">
        {{ review.author }}
      </h3>
      <p>
        <time :datetime="review.datetime">{{ review.date }}</time>
      </p>

      <div class="mt-4 flex items-center">
        <Icon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" name="ic:round-star-rate" :class="[review.rating > rating ? 'text-yellow-400' : 'text-gray-300', 'h-5 w-5 shrink-0']" aria-hidden="true" />
      </div>
      <p class="sr-only">
        {{ review.rating }} out of 5 stars
      </p>

      <div class="prose prose-sm mt-4 max-w-none text-gray-500" v-html="review.content" />
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
