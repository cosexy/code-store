<template>
  <div>
    <h4 class="mb-5 text-[18px] font-semibold">
      Kết Quả
    </h4>
    <div v-auto-animate class="-m-4 flex w-full flex-wrap">
      <div v-for="(product, index) in products" :key="index" class="w-1/3 p-4">
        <products-item :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SearchProductsDocument, SearchProductsQuery, SearchProductsQueryVariables } from '~/apollo/__generated__/graphql'

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
</script>

<style scoped>

</style>
