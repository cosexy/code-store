import type { MaybeRefOrGetter } from '@vueuse/core'
import { toRef } from '@vueuse/core'
import { Cart, Lisence_Type, Product } from '~/apollo/__generated__/graphql'

type Item = Pick<Cart, 'quantity' | 'licenseType'> & {
  product: Pick<Product, 'price' | 'sale'>
}

export const useCart = (_products: MaybeRefOrGetter<Item[]>) => {
  const products = toRef(_products)

  const getPrice = (item: Item) => {
    const regular = item.product.price
    const each = item.licenseType === Lisence_Type.Regular ? regular : (regular * 75)
    return each * item.quantity
  }

  const getDiscountPrice = (item: Item) => {
    const regular = item.product.sale || item.product.price
    const each = item.licenseType === Lisence_Type.Regular ? regular : (regular * 75)
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
