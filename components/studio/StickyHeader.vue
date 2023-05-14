<template>
  <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8">
    <button type="button" class="-m-2.5 p-2.5 text-white xl:hidden" @click="_open = true">
      <span class="sr-only">Open sidebar</span>
      <icon name="heroicons:bars-3" class="h-5 w-5" aria-hidden="true" />
    </button>

    <div id="page-title" class="flex flex-1 items-center gap-x-4 self-stretch lg:gap-x-6" />

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
