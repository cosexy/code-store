<template>
  <div class="space-y-4">
    <h4 class="text-[18px] font-semibold">
      Kết Quả
      <client-only>
        <search-count :count="count" />
      </client-only>
    </h4>

    <template v-if="count || products.length">
      <div v-auto-animate class="-m-4 flex w-full flex-wrap">
        <div v-for="(product, index) in products" :key="index" class="w-1/3 p-4">
          <products-item :product="product" />
        </div>
      </div>

      <includes-pagination :total="count" />
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
import { VueLottiePlayer } from '@nguyenshort/vue-lottie'
import {
  ProductsCountQueryVariables,
  SearchProductsDocument,
  SearchProductsQuery,
  SearchProductsQueryVariables
} from '~/apollo/__generated__/graphql'

const props = defineProps<{
    filter: SearchProductsQueryVariables
}>()

const emit = defineEmits<{
    (event: 'update:filter', value: SearchProductsQueryVariables): void
}>()

const vars = useVModel(props, 'filter', emit)

const { result, loading } = useQuery(SearchProductsDocument, vars, {
  debounce: 500
})
const products = computed<SearchProductsQuery['products']>(() => result.value?.products ?? [])

const countFilter = computed<ProductsCountQueryVariables>(() => ({
  filter: {
    name: vars.value.filter.name,
    category: vars.value.filter.category
  }
}))

const { result: countResult } = useQuery(ProductsCountDocument, countFilter, {
  debounce: 500
})
const count = computed<number>(() => countResult.value?.productsCount ?? 0)
</script>

<style scoped>

</style>
