<template>
  <div>
    <product-review-item v-for="review in reviews" :key="review.id" :review="review" />

    <includes-pagination :total="100" :page="10" />
  </div>
</template>

<script setup lang="ts">
import { ReviewsQueryVariables } from '~/apollo/__generated__/graphql'

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

const reviews2 = {
  average: 4,
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This icon pack is just what I need for my latest project. There's an icon for just about anything I could ever need. Love the playful look!</p>
      `,
      date: 'July 16, 2021',
      datetime: '2021-07-16',
      author: 'Emily Selman',
      avatarSrc:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
    },
    {
      id: 2,
      rating: 5,
      content: `
        <p>Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.</p>
      `,
      date: 'July 12, 2021',
      datetime: '2021-07-12',
      author: 'Hector Gibbons',
      avatarSrc:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
    }
    // More reviews...
  ]
}
</script>

<style scoped>

</style>
