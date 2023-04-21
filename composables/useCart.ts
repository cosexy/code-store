import { useStorage } from '@vueuse/core'
import { Products_products } from '~/apollo/queries/__generated__/Products'

type Product = Pick<Products_products, 'id'>

export const useCart = createGlobalState(
  () => {
    const cart = useStorage<Product[]>('cart', [])

    const addToCart = (product: Product) => {
      cart.value.push(product)
    }

    return {
      cart,
      addToCart
    }
  }
)
