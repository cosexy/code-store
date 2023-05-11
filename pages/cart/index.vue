<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Shopping Cart
      </h1>

      <includes-spinner
        :spinning="loading"
      >
        <div class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <!-- Cart items -->
          <cart-products :products="products" />

          <!-- Order summary -->
          <cart-summary :products="products" />
        </div>
      </includes-spinner>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from 'vue'
import { GetCartQuery, ParseProductsQueryVariables } from '~/apollo/__generated__/graphql'

const products: Ref<GetCartQuery['cart']> = ref([])

const auth = useAuth()
if (auth.user) {
  const { onResult } = await useAsyncQuery(GetCartDocument)
  onResult((res) => {
    products.value = res.data?.cart || []
  })
} else {
  const { storage, isReady } = useLocalCart()!
  const vars = computed<ParseProductsQueryVariables>(() => ({
    filter: {
      products: Array.from(new Set(storage.value.map((item) => item.product.id))) || []
    }
  }))

  const { load, onResult } = useLazyQuery(ParseProductsDocument, vars)

  whenever(isReady, () => load())

  onResult((res) => {
    products.value = storage.value.reduce((acc, item) => {
      const product = res.data?.parseProducts.find((p) => p.id === item.product.id)
      if (product) {
        acc.push({
          ...item,
          product
        })
      }
      return acc
    }, [] as GetCartQuery['cart'])
  })
}

const loading = useQueryLoading()
</script>
