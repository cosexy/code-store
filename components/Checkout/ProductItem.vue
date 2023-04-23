<template>
  <li class="flex items-start space-x-4 py-6">
    <nuxt-img :src="item.product.avatar.path" :alt="item.product.name" provider="backend" class="h-20 w-20 flex-none rounded-md object-cover object-center" />
    <div class="relative flex-auto space-y-1">
      <div class="flex justify-between space-x-4">
        <h3 class="text-white">
          {{ item.product.name }}
        </h3>

        <p class="flex-none text-base font-medium text-white">
          ${{ finalPrice }}
        </p>
      </div>

      <p>{{ item.license === LISENCE_TYPE.EXTENDED ? 'Extended' : 'Regular' }} Lisence</p>

      <div class="flex justify-between space-x-4">
        <p v-if="!item.product.sale">
          {{ item.product.price }}
        </p>
        <p v-else class="relative flex items-center space-x-2">
          <del class="text-gray-400">${{ item.product.price }}</del>
          <span class="text-white">${{ item.product.sale }}</span>
        </p>

        <p>
          x{{ item.quantity }}
        </p>
      </div>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { GetCart_cart } from '~/apollo/queries/__generated__/GetCart'
import { LISENCE_TYPE } from '~/apollo/__generated__/serverTypes'

const props = defineProps<{
  item: GetCart_cart
}>()

const { regular, extended } = usePrice(props.item.product)
const finalPrice = computed(() => {
  return (props.item.license === LISENCE_TYPE.EXTENDED ? extended.value : regular.value) * props.item.quantity
})
</script>

<style scoped></style>
