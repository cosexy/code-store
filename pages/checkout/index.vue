<template>
  <div v-auto-animate class="bg-white">
    <checkout-empty v-if="current === 'empty'" />

    <div v-else-if="current === 'purchase'">
      <div class="fixed left-0 top-0 hidden h-full w-1/2 bg-white lg:block" aria-hidden="true" />
      <div class="fixed right-0 top-0 hidden h-full w-1/2 bg-indigo-900 lg:block" aria-hidden="true" />

      <div class="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 lg:pt-16">
        <h1 class="sr-only">
          Checkout
        </h1>
        <checkout-sumary :cart="cart" />
        <checkout-form :cart="cart" />
      </div>
    </div>

    <checkout-thankyou v-else-if="current === 'thankyou'" />
  </div>
</template>

<script setup async lang="ts">
import { MaybeRefOrGetter } from '@vueuse/core'
import { GetCartDocument, GetCartQuery, ParseProductsQueryVariables } from '~/apollo/__generated__/graphql'

const { current, goTo } = useStepper([
  'empty',
  'purchase'
], 'empty')

const cart = ref<GetCartQuery['cart']>([])
if (cart.value.length) {
  goTo('purchase')
}

let products: MaybeRefOrGetter<GetCartQuery['cart']>
const loading: MaybeRefOrGetter<boolean> = ref(false)

const auth = useAuth()
if (auth.user) {
  const { result } = await useAsyncQuery(GetCartDocument)
  products = computed(() => result.value?.cart || [])
} else {
  const { storage } = useLocalCart()!
  const vars = computed<ParseProductsQueryVariables>(() => ({
    filter: {
      products: Array.from(new Set(storage.value.map((item) => item.product.id))) || []
    }
  }))

  const { result, loading: getting } = await useQuery(ParseProductsDocument, vars)
  products = computed(() => {
    const products = result.value?.parseProducts || []
    return storage.value.map((item) => ({
      ...item,
      product: products.find((product) => product.id === item.product.id)!
    }))
  })
  syncRef(loading, getting, { direction: 'ltr' })
}

</script>
