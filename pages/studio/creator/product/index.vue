<template>
  <studio-tabs :tabs="tabs">
    <headless-tab-panel>
      <studio-creator-product-tabs-information />
    </headless-tab-panel>
  </studio-tabs>
</template>

<script setup lang="ts">
const tabs = computed(() => ['Information', 'Analytics', 'Lisences', 'Reviews'])

const router = useRouter()
</script>

<style scoped>

</style>
