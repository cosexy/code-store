<template>
  <div>
    <button class="relative text-gray-500" @click="toogleShow()">
      <Icon class="h-6 w-6" name="solar:bag-4-bold-duotone" />

      <span
        class="bg-primary aspect-1 shadow-primary-300 absolute right-0 top-0 flex h-[20px] -translate-y-1 translate-x-3 items-center justify-center rounded-full p-0.5 text-[10px] text-white shadow"
      >
        {{ count <= 99 ? count : '99+' }}
      </span>
    </button>

    <cart-main v-model:open="show" :cart="cart as GetCart_cart[]" />
  </div>
</template>

<script lang="ts" setup>
import { GetCart, GetCart_cart } from '~/apollo/queries/__generated__/GetCart'
import { GET_CART } from '~/apollo/queries/cart.query'
import { ADDED_CART } from '~/apollo/subscriptions/cart.subscription'
import { AddedToCart } from '~/apollo/subscriptions/__generated__/AddedToCart'

const cart = ref<GetCart_cart[]>([])

const authStore = useAuth()
if (authStore.user) {
  const { result } = useQuery<GetCart>(GET_CART, {})

  const products = computed(() => result.value?.cart || [])
  syncRef(products, cart, { direction: 'ltr' })

  const { client } = useApolloClient()
  // real time support
  const { onResult: addedToCart } = useSubscription<AddedToCart>(ADDED_CART)
  addedToCart((res) => {
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
      console.log('cart', client.cache)
    }
  })
} else {
  // TODO: use local storage
}
const count = useArrayReduce(cart, (a, b) => a + b.quantity, 0)

const [show, toogleShow] = useToggle(false)
</script>

<style scoped></style>
