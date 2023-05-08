<template>
  <div class="border-b border-white/10 pb-12">
    <h2 class="text-base font-semibold leading-7 text-white">
      {{ title }}
    </h2>
    <p v-if="!$slots['description']" class="mt-1 text-sm leading-6 text-gray-400">
      {{ description }}
    </p>

    <slot name="description" />

    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string
    description: string
}>()
</script>

<style scoped>

</style>
