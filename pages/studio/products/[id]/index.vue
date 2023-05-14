<template>
  <div>
    <includes-teleport to="#page-title">
      <h2 class="text-lg font-medium text-gray-200">
        {{ product?.name }}
      </h2>
    </includes-teleport>
    <studio-tabs :tabs="tabs">
      <headless-tab-panel>
        <studio-product-information :product="product" />
      </headless-tab-panel>
    </studio-tabs>
  </div>
</template>

<script setup lang="ts" async>
const tabs = computed(() => ['Information', 'Analytics', 'Lisences', 'Reviews'])

const route = useRoute()

const { result } = await useAsyncQuery(ProductInformationDocument, {
  filter: {
    id: route.params.id as string
  }
})

const product = computed(() => result.value?.studioProduct)
</script>

<style scoped>

</style>
