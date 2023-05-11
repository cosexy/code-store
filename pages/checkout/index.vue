<template>
  <div class="min-h-screen bg-white">
    <checkout-empty v-if="current === 'loading'" />

    <div v-else-if="current === 'purchasing'">
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
import { Ref } from 'vue'
import { GetCartDocument, GetCartQuery, ParseProductsQueryVariables } from '~/apollo/__generated__/graphql'

const { current, goTo } = useStepper([
  'loading',
  'empty',
  'purchasing'
], 'loading')

const cart: Ref<GetCartQuery['cart']> = ref([])

const auth = useAuth()
const { client } = useApolloClient()

if (auth.user) {
  const { onResult } = await useAsyncQuery(GetCartDocument)
  onResult((res) => {
    cart.value = res.data?.cart || []
  })
} else {
  const { storage, isReady } = useLocalCart()!
  const vars = computed<ParseProductsQueryVariables>(() => ({
    filter: {
      products: Array.from(new Set(storage.value.map((item) => item.product.id))) || []
    }
  }))

  const parseProducts = async () => {
    try {
      const res = await client.query({
        query: ParseProductsDocument,
        variables: vars.value
      })
      const products = res.data?.parseProducts || []

      if (!products.length) {
        goTo('empty')
      } else {
        cart.value = storage.value.reduce((acc, item) => {
          const product = products.find((p) => p.id === item.product.id)
          if (product) {
            acc.push({
              ...item,
              product
            })
          }
          return acc
        }, [] as GetCartQuery['cart'])

        goTo('purchasing')
      }
    } catch (e) {
      //
    }
  }
  watchOnce(isReady, () => parseProducts())
}

const loading = useQueryLoading()

</script>
