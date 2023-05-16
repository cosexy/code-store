<template>
  <div>
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

    <includes-teleport to="#page-title">
      <h2 class="text-lg font-medium text-gray-200">
        My Account
      </h2>
    </includes-teleport>
  </div>
</template>

<script setup lang="ts">
const tabs = computed(() => ['Account', 'Security'])
</script>

<style scoped>

</style>
