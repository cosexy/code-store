<template>
  <div class="lg:col-span-4 lg:row-end-1">
    <div class="aspect-w-6 aspect-h-4 overflow-hidden rounded-lg bg-gray-100">
      <nuxt-img :src="product.avatar.path" :alt="product.name" class="object-cover object-center" provider="backend" />
    </div>
  </div>
</template>

<script lang="ts" setup>

defineProps<{
  product: any
}>()
</script>

<style scoped></style>
