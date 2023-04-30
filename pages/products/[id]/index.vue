<template>
  <div class="bg-white">
    <div class="section-spacing pt-10">
      <!-- Product -->
      <div class="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
        <!-- Product image -->
        <product-image :product="product" />

        <!-- Product details -->
        <product-detail :product="product" />

        <product-tabs />
      </div>
    </div>
    <modal-order-preview />
  </div>
</template>

<script setup async lang="ts">
const route = useRoute()
const { client } = useApolloClient()
const { result } = await useAsyncQuery(GetProductDocument, {
  filter: {
    slug: route.params.id
  }
})

const product = computed(() => result.value!.product)

onMounted(() => {
  console.log(client.cache.identify(product.value))
  setTimeout(() => {
    client.cache.modify({
      id: client.cache.identify(product.value),
      fields: {
        name: () => '12345'
      }
    })
    console.log(client.cache)
  }, 300)
})

</script>
