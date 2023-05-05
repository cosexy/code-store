<template>
  <studio-tabs :tabs="tabs">
    <headless-tab-panel>
      <studio-account-info />
    </headless-tab-panel>

    <headless-tab-panel>
      <studio-account-password />
      <studio-account-sessions />
      <studio-account-delete />
    </headless-tab-panel>
  </studio-tabs>
</template>

<script setup lang="ts">
const tabs = computed(() => ['Account', 'Security'])
</script>

<style scoped>

</style>
