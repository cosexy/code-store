<template>
  <div v-auto-animate>
    <home-banner v-if="showBanner" @close="toggleBanner()" />
    <home-products />
    <!--    <home-categories />-->
    <!--    <home-feature />-->
    <!--    <home-blog />-->
  </div>
</template>

<script lang="ts" setup>
const [showBanner, toggleBanner] = useToggle(true)
</script>

<style scoped></style>
