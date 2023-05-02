<template>
  <li class="flex py-6 sm:py-10">
    <div class="shadow-default h-32 w-48 shrink-0 overflow-hidden rounded-md">
      <nuxt-img
        :src="item.product.avatar.path"
        :alt="item.product.name"
        class="h-full w-full object-cover object-center"
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
              {{ item.license === Lisence_Type.Extended ? 'Extended' : 'Regular' }} License
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
          >
            <option v-for="index in 10" :key="index" :value="index">
              {{ index }}
            </option>
          </select>

          <div class="absolute right-0 top-0">
            <button
              type="button"
              class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
              @click="remove({ input: { id: item.id } })"
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
  CartItemFragment,
  Lisence_Type,
  RemoveFromCartDocument,
  RemoveFromCartMutation
} from '~/apollo/__generated__/graphql'

const props = defineProps<{
  item: CartItemFragment
}>()

const { regular, extended } = usePrice(props.item.product)
const finalPrice = computed(() => {
  return (props.item.license === Lisence_Type.Extended ? extended.value : regular.value) * props.item.quantity
})

const { client } = useApolloClient()

const { mutate: remove, onDone: afterRemoved } = useMutation(RemoveFromCartDocument)
afterRemoved((result: SingleExecutionResult<RemoveFromCartMutation>) => {
  if (result.data?.remoreFromCart) {
    client.cache.evict({
      id: client.cache.identify(result.data.remoreFromCart)
    })
  }
})
</script>

<style scoped>

</style>
