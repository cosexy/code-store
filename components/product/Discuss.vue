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

    <includes-pagination :total="count" :page="1" />
  </div>
</template>

<script setup lang="ts">
import { AddedReviewDocument, CountReviewDocument, ReviewsQueryVariables } from '~/apollo/__generated__/graphql'

const props = defineProps<{
  count: number
  productId: string
}>()

const vars = ref<ReviewsQueryVariables>({
  filter: {
    limit: 10,
    offset: 0,
    product: props.productId,
    sort: 'createdAt'
  }
})

const { result } = useQuery(ReviewsDocument, vars)
const reviews = computed(() => result.value?.reviews || [])

// realtime
const { onResult } = useSubscription(AddedReviewDocument, {
  filter: {
    product: props.productId
  }
})

const { client } = useApolloClient()
onResult((result) => {
  const _review = result.data?.addedReview
  if (_review) {
    // TODO: add review to cache
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
