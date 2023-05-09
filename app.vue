<template>
  <div id="code-app">
    <nuxt-layout />
  </div>
</template>

<script setup lang="ts">
useColorMode()
</script>
<style>
button, html, input, select, textarea {
    font-family: Nunito Sans,SF Pro Text,SF Pro Icons,Roboto,Helvetica Neue,Helvetica,Arial,sans-serif;
}

.section-spacing {
    @apply mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8
}
</style>
