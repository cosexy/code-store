<template>
  <div>
    <a
      href="#"
      class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
    >
      <nuxt-img
        class="h-8 w-8 rounded-full bg-gray-800"
        :src="auth.user?.avatar?.path || '/images/avatar.png'"
        alt=""
        :provider="auth.user?.avatar?.path ? 'backend' : ''"
      />
      <span class="sr-only">Your profile</span>
      <span aria-hidden="true">
        {{ auth.user?.name }}
      </span>
    </a>
  </div>
</template>

<script setup lang="ts">
const auth = useAuth()
</script>

<style scoped>

</style>
