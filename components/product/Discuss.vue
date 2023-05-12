<template>
  <div class="space-y-5">
    <div id="list-reviews">
      <product-review-item
        v-for="review in reviews"
        :key="review.id"
        class="review-item"
        :review="review"
      />
    </div>

    <includes-pagination :total="count" :page="1" @change="changePage" />
  </div>
</template>

<script setup lang="ts">
import { UnwrapNestedRefs } from 'vue-demi'
import { UseOffsetPaginationReturn } from '@vueuse/core'
import { InMemoryCache } from '@apollo/client'
import { GetReviewsFilter } from '~/apollo/__generated__/graphql'

const props = defineProps<{
  count: number
  productId: string
}>()
/**
 * Query
 */
const filter = ref<GetReviewsFilter>({
  limit: 10,
  offset: 0,
  product: props.productId,
  sort: 'createdAt'
})

const { result, fetchMore } = useQuery(ReviewsDocument, {
  filter: filter.value
})

const reviews = computed(
  () => (result.value?.reviews || [])
    .slice(filter.value.offset, filter.value.offset + filter.value.limit)
    .filter((review) => review)
)

const changePage = async (value: UnwrapNestedRefs<UseOffsetPaginationReturn>) => {
  const offset = filter.value.limit * (value.currentPage - 1)
  await fetchMore({
    variables: {
      filter: {
        ...filter.value,
        offset
      }
    }
  })
  filter.value.offset = offset
}

// realtime
const { onResult } = useSubscription(AddedReviewDocument, {
  filter: {
    product: props.productId
  }
})
const { client } = useApolloClient<InMemoryCache>()
onResult((result) => {
  const _review = result.data?.addedReview
  if (_review) {
    client.cache.modify({
      fields: {
        reviews (existingReviews = []) {
          return [_review, ...existingReviews]
        }
      }
    })
    // update average rate
    const reviewInformation = client.readQuery({
      query: ReviewInformationDocument,
      variables: {
        product: props.productId
      }
    })
    if (reviewInformation) {
      const reviewCount = reviewInformation.reviewCount + 1
      const reviewAverage = Number(((reviewInformation.reviewAverage * reviewInformation.reviewCount + _review.rate) / reviewCount).toFixed(1))
      client.writeQuery({
        query: ReviewInformationDocument,
        variables: {
          product: props.productId
        },
        data: {
          reviewAverage,
          reviewCount
        }
      })
    }
  }
})
</script>

<style scoped>
#list-reviews:deep(.review-item:not(:first-child) ._content) {
    @apply border-t border-gray-200;
}
</style>
