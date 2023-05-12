<template>
  <div class="min-h-screen bg-white">
    <div class="section-spacing pt-10">
      <h1 v-if="title" class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {{ title }}
      </h1>

      <div :class="[title && 'mt-12']">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string
}>()
</script>

<style scoped>

</style>
