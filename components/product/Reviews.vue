<template>
  <headless-tab-panel class="-mb-10">
    <h3 class="sr-only">
      Customer Reviews
    </h3>

    <div v-for="(review, reviewIdx) in reviews.featured" :key="review.id" class="flex space-x-4 text-sm text-gray-500">
      <div class="flex-none py-10">
        <img :src="review.avatarSrc" alt="" class="h-10 w-10 rounded-full bg-gray-100">
      </div>
      <div :class="[reviewIdx === 0 ? '' : 'border-t border-gray-200', 'py-10']">
        <h3 class="font-medium text-gray-900">
          {{ review.author }}
        </h3>
        <p>
          <time :datetime="review.datetime">{{ review.date }}</time>
        </p>

        <div class="mt-4 flex items-center">
          <Icon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" name="ic:round-star-rate" :class="[review.rating > rating ? 'text-yellow-400' : 'text-gray-300', 'h-5 w-5 shrink-0']" aria-hidden="true" />
        </div>
        <p class="sr-only">
          {{ review.rating }} out of 5 stars
        </p>

        <div class="prose prose-sm mt-4 max-w-none text-gray-500" v-html="review.content" />
      </div>
    </div>
  </headless-tab-panel>
</template>

<script lang="ts" setup>
const reviews = {
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

<style scoped></style>