<template>
  <div class="pt-6">
    <h3 class="sr-only">
      Lisence
    </h3>

    <div class="prose prose-sm max-w-none text-gray-500" v-html="description" />
  </div>
</template>

<script lang="ts" setup>
import { GetProductQuery } from '~/apollo/__generated__/graphql'

defineProps<{
  description: GetProductQuery['product']['description']
}>()
</script>

<style scoped></style>
