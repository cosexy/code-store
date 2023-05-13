<template>
  <includes-page-session title="Search">
    <div>
      <search-input v-model:value="vars.name" v-model:sort="vars.sort" />
      <div class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <search-categories v-model:value="vars.category" :categories="categories" class="lg:col-span-3" />
        <search-result v-model:filter="vars" class="lg:col-span-9" />
      </div>
    </div>
  </includes-page-session>
</template>

<script lang="ts" setup>
import { CategoriesQuery, GetProductsFilter } from '~/apollo/__generated__/graphql'

const route = useRoute()
const router = useRouter()

const vars = ref<GetProductsFilter>({
  category: '',
  name: route.query.keyword as string,
  sort: 'createdAt',
  offset: 0,
  limit: 8
})

const { result } = useQuery(CategoriesDocument)
const categories = computed<CategoriesQuery['categories']>(() => result.value?.categories || [])

watchDebounced(
  () => vars.value.name,
  () => router.replace({ query: { ...route.query, keyword: vars.value.name } }),
  { debounce: 500, maxWait: 1000 }
)
</script>

<style scoped></style>
