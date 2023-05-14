<template>
  <form class="flex flex-1" action="#" method="GET">
    <label for="search-field" class="sr-only">Search</label>
    <div class="relative w-full">
      <Icon name="ph:magnifying-glass" class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500" aria-hidden="true" />
      <input
        id="search-field"
        v-model="value"
        class="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-0 sm:text-sm"
        placeholder="Search..."
        type="search"
        name="search"
      >
    </div>
  </form>
</template>

<script setup lang="ts">
const props = defineProps<{
    keyword: string
}>()
const emit = defineEmits<{
    (e: 'update:keyword', value: string): void
}>()

const value = useVModel(props, 'keyword', emit)
</script>

<style scoped>

</style>
