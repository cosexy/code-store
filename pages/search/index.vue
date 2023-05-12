<template>
  <includes-page-session title="Search">
    <div>
      <search-input v-model:value="vars.filter.name" v-model:sort="vars.filter.sort" />
      <div class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <search-categories v-model:value="vars.filter.category" class="lg:col-span-4" />
        <div class="lg:col-span-7" />
      </div>
    </div>
  </includes-page-session>
</template>

<script lang="ts" setup>
import { reactive, provide, useRoute } from '#imports'
import { SearchProductsQueryVariables } from '~/apollo/__generated__/graphql'

const vars = ref<SearchProductsQueryVariables>({
  filter: {
    category: '',
    limit: 10,
    name: '',
    offset: 0,
    sort: 'createdAt',
    tags: []
  }
})

const route = useRoute()
provide(
  'searchFilter',
  reactive({
    offset: 0,
    limit: 9,
    sort: 'name',
    category: null,
    name: (route.query.keyword || '') as string,
    status: null
  })
)
</script>

<style scoped></style>
