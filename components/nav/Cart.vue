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
import { Ref } from 'vue'
import { Cart, GetCartQuery, UpdatedInCartSubscription } from '~/apollo/__generated__/graphql'

const cart: Ref<GetCartQuery['cart']> = ref([])

const authStore = useAuth()
if (authStore.user) {
  const { result } = useQuery(GetCartDocument)

  const products = computed(() => result.value?.cart || [])
  syncRef(products, cart, { direction: 'ltr' })

  const { client } = useApolloClient()
  // real time support
  const { onResult: addedToCart } = useSubscription(UpdatedInCartDocument)
  addedToCart((res: SingleExecutionResult<UpdatedInCartSubscription>) => {
    const item = res.data?.updatedInCart
    if (item) {
      if (item.quantity) {
        // check if item already existed
        const existed = cart.value.find((_e) => _e.id === item.id)
        if (existed) {
          // update quantity
          client.cache.modify({
            id: client.cache.identify(existed),
            fields: {
              quantity: () => item.quantity
            }
          })
        } else {
          client.writeQuery({
            query: GetCartDocument,
            data: {
              cart: [...cart.value, item]
            }
          })
        }
      } else {
        // remove item
        client.cache.modify({
          fields: {
            cart: (existing: any, { readField }) => {
              return existing.filter((e: Cart) => item.id !== readField('id', e))
            }
          }
        })
      }
    }
  })

  // replace cart
  const { onResult: syncedCart } = useSubscription(SyncedCartDocument)
  syncedCart(res => {
    const products = res.data?.syncedCart.carts || []
    // write to cache
    client.cache.writeQuery({
      query: GetCartDocument,
      data: {
        cart: products
      }
    })
  })
} else {
  const { storage } = useLocalCart()
  syncRef(storage, cart, { direction: 'ltr' })
}
const count = useArrayReduce(cart, (a, b) => a + b.quantity, 0)
</script>

<style scoped></style>
