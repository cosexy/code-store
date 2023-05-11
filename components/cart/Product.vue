<template>
  <li class="flex py-6 sm:py-10">
    <div class="shadow-default aspect-product h-28 shrink-0 cursor-pointer overflow-hidden rounded-md border-2 border-white">
      <nuxt-img
        :src="item.product.avatar.path"
        :alt="item.product.name"
        class="h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-105"
        provider="backend"
      />
    </div>

    <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
      <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
        <div class="space-y-2.5">
          <div class="flex justify-between">
            <h3 class="font-semibold">
              <a href="#" class="font-medium text-gray-700 hover:text-gray-800">
                {{ item.product.name }}
              </a>
            </h3>
          </div>
          <div class="flex text-sm">
            <p class="text-gray-500">
              {{ item.licenseType === Lisence_Type.Extended ? 'Extended' : 'Regular' }} License
            </p>
          </div>
          <p class="text-sm font-medium text-gray-900">
            ${{ finalPrice }}
          </p>
        </div>

        <div class="mt-4 sm:mt-0 sm:pr-9">
          <label :for="`quantity-${item.id}`" class="sr-only">
            Quantity, {{ item.product.name }}
          </label>
          <select
            :id="`quantity-${item.id}`"
            :name="`quantity-${item.id}`"
            class="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            @change="onChangeQuantity"
          >
            <option v-for="index in 10" :key="index" :value="index" :selected="index === item.quantity">
              {{ index }}
            </option>
          </select>

          <div class="absolute right-0 top-0">
            <button
              type="button"
              class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
              @click="remove()"
            >
              <span class="sr-only">Remove</span>
              <icon name="heroicons:x-mark-20-solid" class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { SingleExecutionResult } from '@apollo/client'
import {
  GetCartQuery,
  Lisence_Type,
  RemoveFromCartDocument,
  RemoveFromCartMutation
} from '~/apollo/__generated__/graphql'

const props = defineProps<{
  item: GetCartQuery['cart'][0]
}>()

const { regular, extended } = usePrice(props.item.product)
const finalPrice = computed(() => {
  return (props.item.licenseType === Lisence_Type.Extended ? extended.value : regular.value) * props.item.quantity
})

const { client } = useApolloClient()
const auth = useAuth()

const { changeQuanlity, remove: removeOnLocal } = useLocalCart()

const { mutate: removeOnServer, onDone: afterRemoved } = useMutation(RemoveFromCartDocument)
afterRemoved((result: SingleExecutionResult<RemoveFromCartMutation>) => {
  if (result.data?.remoreFromCart) {
    client.cache.evict({
      id: client.cache.identify(result.data.remoreFromCart)
    })
  }
})

const remove = () => {
  if (auth.user) {
    removeOnServer({
      input: {
        id: props.item.id
      }
    })
  } else {
    removeOnLocal(props.item.id)
  }
}

const { mutate: changeQuantity } = useMutation(UpdateCartDocument)
/**
 * Change quantity
 * @param event event
 */
const onChangeQuantity = (event: Event) => {
  // event of select changed
  // get selcted value
  const target = event.target as HTMLSelectElement
  const quantity = parseInt(target.value, 10)

  if (auth.user) {
    changeQuantity({
      input: {
        id: props.item.id,
        quantity
      }
    })
  } else {
    changeQuanlity(props.item.id, quantity)
  }
}
</script>

<style scoped>

</style>
