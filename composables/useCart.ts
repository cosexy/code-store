import type { MaybeRefOrGetter } from '@vueuse/core'
import { toRef } from '@vueuse/core'
import { GetProduct_product } from '~/apollo/queries/__generated__/GetProduct'
import { GetCart_cart } from '~/apollo/queries/__generated__/GetCart'
import { LISENCE_TYPE } from '~/apollo/__generated__/serverTypes'

type Product = Pick<GetProduct_product, 'price' | 'sale'>

type Item = Pick<GetCart_cart, 'quantity' | 'license'> & {
  product: Product
}

export const usecart = (_products: MaybeRefOrGetter<Item[]>) => {
  const products = toRef(_products)

  const getPrice = (item: Item) => {
    const regular = item.product.price
    const each = item.license === LISENCE_TYPE.REGULAR ? regular : (regular * 75)
    return each * item.quantity
  }

  const getDiscountPrice = (item: Item) => {
    const regular = item.product.sale || item.product.price
    const each = item.license === LISENCE_TYPE.REGULAR ? regular : (regular * 75)
    return each * item.quantity
  }

  const original = computed(() => products.value.reduce((a, b) => a + getPrice(b), 0))
  const discount = computed(() => products.value.reduce((a, b) => a + getDiscountPrice(b), 0))
  const fee = computed(() => Math.round(original.value * 0.05))

  const final = computed(() => discount.value + fee.value)

  return {
    products,
    original,
    discount,
    fee,
    final
  }
}
