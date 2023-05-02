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
  </div>
</template>

<script lang="ts" setup></script>

<style scoped></style>
