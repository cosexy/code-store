<template>
  <studio-tabs :tabs="tabs">
    <headless-tab-panel>
      <studio-products-detail-information />
    </headless-tab-panel>
  </studio-tabs>
</template>

<script setup lang="ts">
const tabs = computed(() => ['Information', 'Analytics', 'Lisences', 'Reviews'])
</script>

<style scoped>

</style>
