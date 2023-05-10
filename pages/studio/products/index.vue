<template>
  <div>
    <studio-products-table v-if="count" :count="count" />
  </div>
</template>

<script setup lang="ts" async>
import { useRouteQuery } from '@vueuse/router'
import { StudioProductsCountQueryVariables } from '~/apollo/__generated__/graphql'

const name = useRouteQuery<string>('name', '')

const filter = ref<StudioProductsCountQueryVariables>({
  filter: {
    name: name.value
  }
})

const { result } = await useAsyncQuery(StudioProductsCountDocument, filter)

const count = computed(() => result.value?.studioProductsCount || 0)
</script>
