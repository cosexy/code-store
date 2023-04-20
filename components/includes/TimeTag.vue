<template>
  <time :datetime="$dayjs(timestamp).toISOString()">
    <slot :date="$dayjs(timestamp)" />
  </time>
</template>

<script lang="ts" setup>

withDefaults(defineProps<{
  timestamp?: number
}>(), {
  timestamp: Date.now()
})
</script>

<style scoped></style>
