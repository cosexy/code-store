<template>
  <div class="mx-auto max-w-2xl px-4 py-5">
    <div class="h-[300px]">
      <client-only>
        <vue-lottie-player
          path="https://assets9.lottiefiles.com/packages/lf20_pwohahvd.json"
          loop
          style="width: 100%; height: 300px"
        />
      </client-only>
    </div>
    <p class="mt-1 text-center text-sm text-gray-500">
      You haven’t added any projects yet. Get started by discovering one of our featured templates.
    </p>
    <ul role="list" class="mt-6 grid grid-cols-1 gap-6 border-y border-gray-200 py-6 sm:grid-cols-2">
      <li v-for="(item, itemIdx) in items" :key="itemIdx" class="flow-root">
        <div class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50">
          <div :class="[item.background, 'flex h-16 w-16 shrink-0 items-center justify-center rounded-lg']">
            <Icon :name="item.icon" class="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-900">
              <a href="#" class="focus:outline-none">
                <span class="absolute inset-0" aria-hidden="true" />
                <span>{{ item.title }}</span>
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              {{ item.description }}
            </p>
          </div>
        </div>
      </li>
    </ul>
    <div class="mt-4 flex">
      <a href="#" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
        Or go to discovery page
        <span aria-hidden="true"> &rarr;</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VueLottiePlayer } from '@nguyenshort/vue-lottie'

const items = [
  {
    title: 'Wordpress',
    description: 'The most popular CMS in the world',
    icon: 'ic:baseline-wordpress',
    background: 'bg-blue-500'
  },
  {
    title: 'NodeJS',
    description: 'An open-source, cross-platform JavaScript runtime environment.',
    icon: 'mdi:nodejs',
    background: 'bg-green-500'
  },
  {
    title: '.Net',
    description: 'A software development framework created by Microsoft.',
    icon: 'cib:dot-net',
    background: 'bg-orange-500'
  },
  {
    title: 'PHP',
    description: 'An open-source scripting language for web development.',
    icon: 'bx:bxl-php',
    background: 'bg-rose-500'
  }
]
</script>

<style scoped>

</style>
