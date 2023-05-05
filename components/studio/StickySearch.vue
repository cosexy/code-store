<template>
  <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8">
    <button type="button" class="-m-2.5 p-2.5 text-white xl:hidden" @click="_open = true">
      <span class="sr-only">Open sidebar</span>
      <icon name="heroicons:bars-3" class="h-5 w-5" aria-hidden="true" />
    </button>

    <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
      <form class="flex flex-1" action="#" method="GET">
        <label for="search-field" class="sr-only">Search</label>
        <div class="relative w-full">
          <Icon name="ph:magnifying-glass" class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500" aria-hidden="true" />
          <input id="search-field" class="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-0 sm:text-sm" placeholder="Search..." type="search" name="search">
        </div>
      </form>
    </div>

    <div id="actions" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (event: 'update:open', value: boolean): void
}>()

const _open = useVModel(props, 'open', emit)
</script>

<style scoped>

</style>
