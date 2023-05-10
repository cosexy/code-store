<template>
  <div>
    <nuxt-link to="/cart" class="group -m-2 flex items-center p-2">
      <icon name="solar:bag-linear" class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
      <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
        {{ count }}
      </span>
      <span class="sr-only">items in cart, view bag</span>
    </nuxt-link>
  </div>
</template>

<script lang="ts" setup>
import { SingleExecutionResult } from '@apollo/client'
import { AddedToCartSubscription, GetCartQuery } from '~/apollo/__generated__/graphql'

const cart = ref<GetCartQuery['cart']>([])

const authStore = useAuth()
if (authStore.user) {
  const { result } = useQuery(GetCartDocument)

  const products = computed(() => result.value?.cart || [])
  syncRef(products, cart, { direction: 'ltr' })

  const { client } = useApolloClient()
  // real time support
  const { onResult: addedToCart } = useSubscription(AddedToCartDocument)
  addedToCart((res: SingleExecutionResult<AddedToCartSubscription>) => {
    const item = res.data?.addedToCart
    if (item) {
      // check if item already exists
      const exists = cart.value.find((_e) => _e.id === item.id)
      if (exists) {
        // update quantity
        client.cache.modify({
          id: client.cache.identify(exists),
          fields: {
            quantity: () => item.quantity
          }
        })
      } else {
        client.cache.modify({
          fields: {
            cart: (existing) => [...existing, item]
          }
        })
      }
    }
  })
}
const count = useArrayReduce(cart, (a, b) => a + b.quantity, 0)
</script>

<style scoped></style>
