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
  </div>
</template>

<script setup async lang="ts">
import { GET_PRODUCT } from '~/apollo/queries/projects.query'
import { GetProduct } from '~/apollo/queries/__generated__/GetProduct'

const route = useRoute()
const { data } = await useAsyncQuery<GetProduct>(GET_PRODUCT, {
  filter: {
    slug: route.params.id
  }
})
const product2 = computed(() => data.value!.product)

</script>
