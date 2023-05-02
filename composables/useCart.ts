import type { MaybeRefOrGetter } from '@vueuse/core'
import { toRef } from '@vueuse/core'
import { CartItemFragment, Product } from '~/apollo/__generated__/graphql'

type ProductItem = Pick<Product, 'price' | 'sale'>

type Item = Pick<CartItemFragment, 'quantity' | 'license'> & {
  product: ProductItem
}

export const useCart = (_products: MaybeRefOrGetter<Item[]>) => {
  const products = toRef(_products)

  const getPrice = (item: Item) => {
    const regular = item.product.price
    const each = item.license === 'REGULAR' ? regular : (regular * 75)
    return each * item.quantity
  }

  const getDiscountPrice = (item: Item) => {
    const regular = item.product.sale || item.product.price
    const each = item.license === 'REGULAR' ? regular : (regular * 75)
    return each * item.quantity
  }

  const original = computed(() => products.value.reduce((a, b) => a + getPrice(b), 0))
  const discount = computed(() => products.value.reduce((a, b) => a + getDiscountPrice(b), 0))

  // original - discount
  const savings = computed(() => original.value - discount.value)
  const fee = computed(() => Math.round(original.value * 0.05))
  const final = computed(() => discount.value + fee.value)

  return {
    products,
    original,
    discount,
    savings,
    fee,
    final
  }
}