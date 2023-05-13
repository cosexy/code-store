<template>
  <div>
    <nav-main />
    <nuxt-page />
    <includes-footer class="mt-12" />
    <modal-auth />
    <client-only>
      <includes-notify />
      <spotlight-view />
    </client-only>
    <modal-sync-cart v-if="auth.user" />
  </div>
</template>

<script lang="ts" setup>
const auth = useAuth()
</script>

<style scoped></style>
