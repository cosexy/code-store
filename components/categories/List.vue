<template>
  <div>
    <nuxt-link
      v-for="category in categories"
      :key="category.id"
      :to="`/categories/${category.slug}`"
    >
      {{ category.name }}
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { CategoriesQuery } from '~/apollo/__generated__/graphql'

const props = defineProps<{
    categories: CategoriesQuery['categories']
}>()
</script>

<style scoped>

</style>
