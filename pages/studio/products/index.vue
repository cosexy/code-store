<template>
  <div>
    <studio-products-purchased-table v-if="count" :count="count" />
  </div>
</template>

<script setup lang="ts" async>
const { result } = await useAsyncQuery(OrdersCountDocument)
const count = computed(() => result.value?.ordersCount || 0)
</script>
