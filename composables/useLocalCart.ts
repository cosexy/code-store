import { Cart, Product } from '~/apollo/__generated__/graphql'

export interface LocalCartItem extends Pick<Cart, 'licenseType' | 'quantity' | 'id'>{
    product: Pick<Product, 'id'>
}

export const useLocalCart = () => {
  const isReady = ref(false)

  const storage = useLocalStorage<LocalCartItem[]>('cart', [])

  const count = useArrayReduce(storage, (acc, item) => acc + item.quantity, 0)

  const addOrInc = (item: Omit<LocalCartItem, 'quantity' | 'id'>) => {
    const index = storage.value.findIndex((i) => i.product.id === item.product.id && i.licenseType === item.licenseType)
    if (index === -1) {
      storage.value.push({
        ...item,
        quantity: 1,
        id: Math.random().toString(36).toString()
      })
    } else {
      storage.value[index].quantity++
    }
  }

  const changeQuanlity = (id: string, quanlity: number) => {
    const index = storage.value.findIndex((i) => i.id === id)
    if (index === -1) {
      return
    }
    storage.value[index].quantity = quanlity
  }

  onMounted(() => nextTick(() => isReady.value = true))

  return {
    storage,
    count,
    addOrInc,
    changeQuanlity,
    isReady
  }
}
