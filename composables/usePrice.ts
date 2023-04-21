import type { MaybeRefOrGetter } from '@vueuse/core'
import { toRef } from '@vueuse/core'
import { GetProduct_product } from '~/apollo/queries/__generated__/GetProduct'

type Product = Pick<GetProduct_product, 'price' | 'sale'>

export const usePrice = (_product: MaybeRefOrGetter<Product>) => {
  const product = toRef(_product)

  const price = computed(() => product.value.price)
  const sale = computed(() => product.value.sale)
  // MaybeRef to ref
  const regular = computed(() => sale?.value || price.value)
  const extended = computed(() => regular.value * 75)

  return {
    price,
    sale,
    product,
    regular,
    extended
  }
}
