<template>
  <div class="ml-auto flex items-center">
    <div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
      <nav-user />
      <span class="h-6 w-px bg-gray-200" aria-hidden="true" />
    </div>

    <div class="hidden lg:ml-8 lg:flex">
      <a href="#" class="flex items-center text-gray-700 hover:text-gray-800">
        <img src="https://tailwindui.com/img/flags/flag-canada.svg" alt="" class="block h-auto w-5 shrink-0">
        <span class="ml-3 block text-sm font-medium">CAD</span>
        <span class="sr-only">, change currency</span>
      </a>
    </div>

    <!-- Search -->
    <div class="flex lg:ml-6">
      <a
        href="javascript:void(0)"
        class="p-2 text-gray-400 hover:text-gray-500"
        @click="openSpotlight()"
      >
        <span class="sr-only">Search</span>
        <icon name="ph:magnifying-glass" class="h-6 w-6" aria-hidden="true" />
      </a>
    </div>

    <!-- Cart -->
    <nav-cart class="ml-4 flow-root lg:ml-6" />
  </div>
</template>

<script setup lang="ts">
const { open: openAuth } = useDialog('auth')
const { open: openSpotlight } = useDialog('spotlight')
const authStore = useAuth()
</script>

<style scoped>

</style>
