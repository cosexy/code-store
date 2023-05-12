<template>
  <includes-page-session title="Search">
    <div>
      <search-input v-model:value="vars.filter.name" v-model:sort="vars.filter.sort" />
      <div class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <search-categories v-model:value="vars.filter.category" class="lg:col-span-3" />
        <search-result v-model:filter="vars" class="lg:col-span-9" />
      </div>
    </div>
  </includes-page-session>
</template>

<script lang="ts" setup>
import { SearchProductsQueryVariables } from '~/apollo/__generated__/graphql'

const route = useRoute()
const router = useRouter()

const vars = ref<SearchProductsQueryVariables>({
  filter: {
    category: '',
    limit: 10,
    name: route.query.keyword as string,
    offset: 0,
    sort: 'createdAt'
  }
})

watchDebounced(
  () => vars.value.filter.name,
  () => router.replace({ query: { ...route.query, keyword: vars.value.filter.name } }),
  { debounce: 500, maxWait: 1000 }
)
</script>

<style scoped></style>
