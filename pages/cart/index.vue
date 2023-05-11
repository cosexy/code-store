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
          <div class="lg:col-span-7">
            <!-- Cart items -->
            <cart-products
              v-if="current === 'showing'"
              :products="products"
            />
            <div v-if="current === 'empty'" class="flex flex-col items-center">
              <vue-lottie-player
                path="https://assets2.lottiefiles.com/packages/lf20_CWcCII.json"
                loop
                height="300px"
                width="300px"
              />
              <p class="text-sm text-gray-500">
                Your cart is empty.
                <nuxt-link to="/" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Go to discovery page
                  <span aria-hidden="true"> &rarr;</span>
                </nuxt-link>
              </p>
            </div>
            <div />
          </div>

          <!-- Order summary -->
          <cart-summary :products="products" />
        </div>
      </includes-spinner>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MaybeRefOrGetter } from '@vueuse/core'
import { VueLottiePlayer } from '@nguyenshort/vue-lottie'
import { GetCartQuery, ParseProductsQueryVariables } from '~/apollo/__generated__/graphql'

let products: MaybeRefOrGetter<GetCartQuery['cart']>

const { current, goTo } = useStepper([
  'loading',
  'empty',
  'showing'
], 'loading')

const auth = useAuth()
if (auth.user) {
  const { result } = await useAsyncQuery(GetCartDocument)

  products = computed(() => result.value?.cart || [])

  watch(products, (val) => {
    if (!val.length) {
      goTo('empty')
    } else {
      goTo('showing')
    }
  }, { immediate: true })
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

  watch(products, (val) => {
    if (!isReady.value) {
      goTo('loading')
    } else if (!val.length) {
      goTo('empty')
    } else {
      goTo('showing')
    }
  })
}

const loading = useQueryLoading()
</script>
