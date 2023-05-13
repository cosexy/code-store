<template>
  <div class="space-y-4">
    <h4 class="text-[18px] font-semibold">
      Kết Quả
      <client-only>
        <search-count :count="count" />
      </client-only>
    </h4>

    <template v-if="count || items.length">
      <div v-auto-animate class="-m-4 flex w-full flex-wrap">
        <div v-for="(product, index) in items" :key="index" class="w-1/3 p-4">
          <products-item :product="product" />
        </div>
      </div>

      <includes-pagination
        :total="count"
        :page-size="offsetVars.limit"
        @change="value => toPage(value.currentPage)"
      />
    </template>

    <div v-else-if="loading" class="flex flex-col items-center justify-center">
      <vue-lottie-player
        width="250px"
        height="200px"
        loop
        path="/json/loading.json"
      />
    </div>

    <div v-else class="flex flex-col items-center justify-center">
      <vue-lottie-player
        path="https://assets9.lottiefiles.com/packages/lf20_EMTsq1.json"
        loop
        width="300px"
        height="300px"
      />
      <p class="relative z-20 -mt-2 text-sm text-gray-500">
        Nothing here. I am sure you will find something interesting.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRef } from '@vueuse/core'
import { VueLottiePlayer } from '@nguyenshort/vue-lottie'
import {
  GetProductsFilter,
  ProductsCountQueryVariables,
  SearchProductsDocument,
  SearchProductsQuery
} from '~/apollo/__generated__/graphql'

const props = defineProps<{
    filter: GetProductsFilter
}>()

const offsetVars = toRef(props.filter)

const { result, loading, fetchMore, refetch } = useQuery(SearchProductsDocument, {
  filter: offsetVars.value
}, {
  debounce: 500
})
const products = computed<SearchProductsQuery['products']>(() => result.value?.products ?? [])

watch(() => [props.filter.name, props.filter.sort, props.filter.category], () => {
  offsetVars.value = {
    ...offsetVars.value,
    limit: 8,
    offset: 0
  }
  refetch({
    filter: offsetVars.value
  })
})

const countFilter = computed<ProductsCountQueryVariables>(() => ({
  filter: {
    name: props.filter.name,
    category: props.filter.category
  }
}))

const { result: countResult } = useQuery(ProductsCountDocument, countFilter, {
  debounce: 500
})
const count = computed<number>(() => countResult.value?.productsCount ?? 0)

const { items, data, toPage, onLoad, options } = useAutoPagination(products, count, offsetVars)

onLoad((offset) => fetchMore({
  variables: {
    filter: {
      ...offsetVars.value,
      offset
    }
  }
})
)
</script>

<style scoped>

</style>
