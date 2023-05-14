<template>
  <Teleport v-if="show" :to="to">
    <slot />
  </Teleport>
</template>

<script lang="ts" setup>
defineProps<{
  to: '#actions' | '#page-title' | string
}>()
const show = ref(false)

tryOnMounted(() => nextTick(() => (show.value = true)))
</script>

<style scoped></style>
