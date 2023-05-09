<template>
  <studio-tabs :tabs="tabs">
    <headless-tab-panel>
      <studio-products-detail-information />
    </headless-tab-panel>
  </studio-tabs>
</template>

<script setup lang="ts">
import { ProductInformationDocument } from '#imports'

const tabs = computed(() => ['Information', 'Analytics', 'Lisences', 'Reviews'])
const route = useRoute()

const { result } = await useAsyncQuery(ProductInformationDocument, {
  filter: {
    slug: route.params.id as string
  }
})

console.log(result.value)
</script>

<style scoped>

</style>
