import { useStorage } from '@vueuse/core'
import { Cart, Product } from '~/apollo/__generated__/graphql'

export interface LocalCartItem extends Pick<Cart, 'licenseType' | 'quantity' | 'id'>{
    product: Pick<Product, 'id'>
}

export const useLocalCart = () => {
  const storage = useStorage<LocalCartItem[]>('cart', [])

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

  return {
    storage,
    addOrInc,
    changeQuanlity
  }
}
