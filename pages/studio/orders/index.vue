<template>
  <div>
    <includes-teleport to="#page-title">
      <h2 class="text-lg font-medium text-gray-200">
        Orders
      </h2>
    </includes-teleport>

    <client-only>
      <includes-spinner :spinning="false">
        <table
          class="w-full whitespace-nowrap text-left"
        >
          <colgroup>
            <col class="lg:w-5/12">
            <col class="lg:w-2/12">
            <col class="lg:w-2/12">
            <col class="lg:w-2/12">
            <col class="lg:w-1/12">
          </colgroup>
          <thead class="border-b border-white/10 text-sm leading-6 text-white">
            <tr>
              <!-- Avatar -->
              <th scope="col" class="py-2 pl-4 pr-8 font-semibold sm:table-cell sm:pl-6 lg:pl-8">
                Products
              </th>

              <!-- Count product -->
              <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">
                Count
              </th>

              <!-- Count product -->
              <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">
                Amount
              </th>

              <!-- Amount -->
              <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">
                Created At
              </th>

              <th scope="col" class="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8">
                Action
              </th>
            </tr>
          </thead>
          <tbody
            class="divide-y divide-white/5"
          >
            <studio-orders-item
              v-for="order in orders"
              :key="order.id"
              :order="order"
            />
          </tbody>
        </table>
        <div class="border-t border-white/10 px-8 py-4">
          <includes-pagination
            :total="count"
            :page-size="5"
          />
        </div>
      </includes-spinner>
    </client-only>
  </div>
</template>

<script setup lang="ts">

const { result } = await useAsyncQuery(OrdersCountDocument)
const count = computed(() => result.value?.ordersCount || 0)

const { result: ordersResult } = useQuery(OrdersDocument, {
  filter: {
    sort: 'createdAt',
    offset: 0,
    limit: 100
  }
})

const orders = computed(() => ordersResult.value?.orders || [])
</script>

<style scoped>

</style>
