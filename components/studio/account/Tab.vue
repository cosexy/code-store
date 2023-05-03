<template>
  <div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
    <div>
      <h2 class="text-base font-semibold leading-7 text-white">
        {{ name }}
      </h2>
      <p class="mt-1 text-sm leading-6 text-gray-400">
        {{ subject }}
      </p>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  subject: string
}>()
</script>

<style scoped>

</style>
