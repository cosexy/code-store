<template>
  <div>
    <table class="w-full whitespace-nowrap text-left" :count="count">
      <colgroup>
        <col class="w-full sm:w-4/12">
        <col class="lg:w-4/12">
        <col class="lg:w-2/12">
        <col class="lg:w-1/12">
        <col class="lg:w-1/12">
      </colgroup>
      <thead class="border-b border-white/10 text-sm leading-6 text-white">
        <tr>
          <th scope="col" class="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
            Products
          </th>
          <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">
            Download
          </th>
          <th scope="col" class="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">
            Expertion day
          </th>
          <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">
            Price
          </th>
          <th scope="col" class="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8">
            Created At
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-white/5">
        <studio-products-purchased-item v-for="item in orders" :key="item.id" :item="item" />
      </tbody>
    </table>

    <div class="border-t border-white/10 px-8 py-4">
      <includes-pagination class="hidden" :total="count" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { OrdersQueryVariables } from '~/apollo/__generated__/graphql'

const props = defineProps<{
  count: number
}>()

const filter = ref<OrdersQueryVariables>({
  filter: {
    sort: 'createdAt',
    offset: 0,
    limit: 10
  }
})
const { result } = useQuery(OrdersDocument, filter, {
  fetchPolicy: 'network-only'
})
const orders = computed(() => result.value?.orders || [])
</script>
