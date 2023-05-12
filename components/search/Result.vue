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
  </div>
</template>

<script setup lang="ts">
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

const { result } = useQuery(SearchProductsDocument, vars, {
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
