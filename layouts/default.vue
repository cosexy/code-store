<template>
  <div>
    <includes-header />
    <nuxt-page />
    <includes-footer />
    <modal-auth />
    <client-only>
      <includes-notify />
    </client-only>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped></style>
