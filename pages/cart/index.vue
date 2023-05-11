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
import { MaybeRefOrGetter } from '@vueuse/core'
import { GetCartQuery, ParseProductsQueryVariables } from '~/apollo/__generated__/graphql'

let products: MaybeRefOrGetter<GetCartQuery['cart']>

const auth = useAuth()
if (auth.user) {
  const { result } = await useAsyncQuery(GetCartDocument)

  products = computed(() => result.value?.cart || [])
} else {
  const { storage, isReady } = useLocalCart()!
  const vars = computed<ParseProductsQueryVariables>(() => ({
    filter: {
      products: Array.from(new Set(storage.value.map((item) => item.product.id))) || []
    }
  }))

  const { load, result } = useLazyQuery(ParseProductsDocument, vars)

  whenever(isReady, () => load())

  products = computed(() => {
    const products = result.value?.parseProducts || []
    return storage.value.reduce((acc, item) => {
      const product = products.find((p) => p.id === item.product.id)
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
