<template>
  <tr>
    <!-- Avatar -->
    <th scope="col" class="py-2 pl-4 pr-8 font-semibold sm:table-cell sm:pl-6 lg:pl-8">
      <div class="flex items-center text-gray-300">
        <div class="relative h-[100px] w-[200px]">
          <div
            v-for="(image, index) in avatars"
            :key="index"
            class="aspect-product absolute left-0 top-0 block h-full overflow-hidden rounded-md"
            :style="{
              transform: `translateX(${index * 20}px) scale(${1 - index * 0.1})`,
              zIndex: avatars.length - index
            }"
          >
            <nuxt-img
              :src="image"
              provider="backend"
              class="h-full w-full object-cover transition hover:scale-105"
            />
          </div>
        </div>

        <div class="line- line-clamp-2 w-[200px] whitespace-pre-line">
          <span
            v-for="(pro, index) in item.merchandise"
            :key="index"
          >
            {{ pro.product.name }}
          </span>
        </div>
      </div>
    </th>

    <!-- Count product -->
    <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold text-gray-300 md:table-cell lg:pr-20">
      {{ count }}
    </th>

    <!-- Count product -->
    <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold text-gray-300 md:table-cell lg:pr-20">
      {{ final }}
    </th>

    <!-- Amount -->
    <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold text-gray-300 md:table-cell lg:pr-20">
      {{ $dayjs(item.createdAt).format('DD/MM/YYYY') }}
    </th>

    <th scope="col" class="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8">
      <div class="flex space-x-3">
        <button type="button" aria-expanded="false" data-headlessui-state="">
          <button data-v-b67af152="" type="button" class="rounded bg-rose-500 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500">
            Remove
          </button>
        </button>

        <button data-v-b67af152="" type="button" class="rounded bg-indigo-500 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
          Edit
        </button>
      </div>
    </th>
  </tr>
</template>

<script setup lang="ts">
import { OrderItemFragment, OrdersQuery } from '~/apollo/__generated__/graphql'
import { UseCartItem } from '~/composables/useCart'

const props = defineProps<{
  order: OrdersQuery['orders'][0]
}>()

const item = computed(() => props.order as OrderItemFragment)

// get 3 items of merchandise
const avatars = computed(() => item.value.merchandise.slice(0, 3).map((merchandise) => merchandise.product.avatar.path))

const cart = computed<UseCartItem[]>(() => item.value.merchandise.map((item) => ({
  quantity: item.quantity,
  licenseType: item.lisence.type,
  product: {
    price: item.price,
    sale: item.sale
  }
})))

const count = computed(() => cart.value.reduce((acc, curr) => acc + curr.quantity, 0))

const { final } = useCart(cart)

</script>

<style scoped>

</style>
