<template>
  <div v-auto-animate class="space-y-14">
    <home-banner v-if="showBanner" @close="toggleBanner()" />
    <div v-else class="" />
    <home-products />
    <div class="space-y-24">
      <home-categories />
      <home-feature />
      <home-blog />
      <home-stats />
    </div>
  </div>
</template>

<script lang="ts" setup>
const [showBanner, toggleBanner] = useToggle(true)
</script>

<style scoped></style>
