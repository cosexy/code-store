<template>
  <includes-spinner :spinning="loading">
    <table class="w-full whitespace-nowrap text-left" :count="total">
      <colgroup>
        <col class="w-full sm:w-3/12">
        <col class="lg:w-4/12">
        <col class="lg:w-2/12">
        <col class="lg:w-1/12">
        <col class="lg:w-1/12">
      </colgroup>
      <thead class="border-b border-white/10 text-sm leading-6 text-white">
        <tr>
          <!-- Avatar -->
          <th scope="col" class="py-2 pl-4 pr-8 font-semibold sm:table-cell sm:pl-6 lg:pl-8">
            Product
          </th>

          <!-- Name -->
          <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">
            Name
          </th>
          <!-- Version -->
          <th scope="col" class="hidden py-2 pl-0 pr-8 text-center font-semibold md:table-cell lg:pr-20">
            Version
          </th>

          <!-- Price -->
          <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">
            Price
          </th>

          <!-- Sale -->
          <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">
            Sale
          </th>

          <th scope="col" class="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8">
            Action
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-white/5">
        <studio-products-item
          v-for="product in items"
          :key="product.id"
          :product="product"
          @deleted="afterDeleted"
        />
      </tbody>
    </table>

    <div class="border-t border-white/10 px-8 py-4">
      <includes-pagination
        :total="count"
        :page-size="filter.limit"
        @change="value => toPage(value.currentPage)"
      />
    </div>
  </includes-spinner>
</template>

<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'
import { GetProductsStudioFilter, StudioProductsQueryVariables } from '~/apollo/__generated__/graphql'

const props = defineProps<{
  count: number
}>()

const total = toRef(props, 'count')

const filter = ref<GetProductsStudioFilter>({
  name: '',
  limit: 2,
  offset: 0,
  sort: 'createdAt'
})

const { result, loading, fetchMore } = useQuery(StudioProductsDocument, {
  filter: filter.value
})
const products = computed(() => result.value?.studioProducts || [])

const { items, toPage, onLoad } = useAutoPagination(products, total, filter)

onLoad((offset) => fetchMore({
  variables: {
    filter: {
      ...filter.value,
      offset
    }
  }
})
)

const { client } = useApolloClient()
const afterDeleted = () => {
  // decrise the value of query StudioProductsDocument
  // client.writeQuery({
  //   query: StudioProductsCountDocument,
  //   variables: {
  //     filter: {
  //       name: name.value
  //     }
  //   },
  //   data: {
  //     studioProductsCount: props.count - 1
  //   }
  // })
}
</script>

<style scoped>

</style>
