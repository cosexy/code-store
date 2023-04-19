<template>
  <div class="section-spacing">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          From the blog
        </h2>
        <p class="mt-2 text-lg leading-8 text-gray-600">
          Learn how to grow your business with our expert advice.
        </p>
      </div>
      <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <article v-for="post in posts" :key="post.id" class="flex flex-col items-start justify-between space-y-4">
          <div class="relative w-full">
            <nuxt-img :src="post.avatar.path" provider="backend" alt="" class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]">
              <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            </nuxt-img>
          </div>
          <h3 class="text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <a href="#">
              <span class="absolute inset-0" />
              {{ post.name }}
            </a>
          </h3>
          <p class="line-clamp-3 text-sm leading-6 text-gray-600">
            {{ post.description }}
          </p>
          <div class="relative flex items-center gap-x-4">
            <img src="/images/avatar.jpg" alt="" class="h-10 w-10 rounded-full bg-gray-100">
            <div class="text-sm leading-6">
              <p class="font-semibold text-gray-900">
                <a href="#">
                  <span class="absolute inset-0" />
                  {{ post.user.name }}
                </a>
              </p>
              <p class="text-gray-600">
                {{ post.user.role }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GET_POSTS } from '~/apollo/queries/blogs.query'
import { HomePosts, HomePostsVariables } from '~/apollo/queries/__generated__/HomePosts'

const { result } = useQuery<HomePosts, HomePostsVariables>(GET_POSTS, {
  filter: {
    limit: 3,
    offset: 0,
    sort: 'createdAt'
  }
})
const posts = computed(() => result.value?.posts || [])
</script>
