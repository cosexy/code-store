<template>
  <div>
    <nav-main />
    <nuxt-page />
    <includes-footer />
    <modal-auth />
    <client-only>
      <includes-notify />
      <includes-search />
    </client-only>
    <modal-sync-cart v-if="auth.user" />
  </div>
</template>

<script lang="ts" setup>
const auth = useAuth()
</script>

<style scoped></style>
