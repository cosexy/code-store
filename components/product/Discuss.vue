<template>
  <div class="space-y-5">
    <div id="list-reviews">
      <product-review-item
        v-for="review in items"
        :key="review.id"
        class="review-item"
        :review="review"
      />
    </div>

    <includes-pagination :total="count" :page="1" @change="value => toPage(value.currentPage)" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  count: number
  productId: string
}>()

const countRef = toRef(props, 'count')

/**
 * Query
 */
const offsetVars = ref({
  limit: 10,
  offset: 0
})

const { result, fetchMore } = useQuery(ReviewsDocument, {
  filter: {
    ...offsetVars.value,
    product: props.productId,
    sort: 'createdAt'
  }
})
const reviews = computed(() => result.value?.reviews || [])
const { items, options, toPage, onLoad } = useAutoPagination(reviews, countRef, offsetVars)

onLoad(async (offset) => {
  await fetchMore({
    variables: {
      filter: {
        ...offsetVars.value,
        sort: 'createdAt',
        product: props.productId,
        offset
      }
    }
  })
  document.getElementById('project-tabs')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
})
</script>

<style scoped>
#list-reviews:deep(.review-item:not(:first-child) ._content) {
    @apply border-t border-gray-200;
}
</style>
