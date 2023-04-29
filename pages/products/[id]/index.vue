<template>
  <div class="bg-white">
    <div class="section-spacing pt-10">
      <!-- Product -->
      <div class="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
        <!-- Product image -->
        <product-image :product="product2" />

        <!-- Product details -->
        <product-detail :product="product2" />

        <product-tabs />
      </div>
    </div>
    <modal-order-preview />
  </div>
</template>

<script setup async lang="ts">
import { GetProductDocument } from '~/apollo/__generated__/graphql'

const route = useRoute()
const { data } = await useAsyncQuery(GetProductDocument, {
  filter: {
    slug: route.params.id
  }
})
const product2 = computed(() => data.value!.product)

</script>
