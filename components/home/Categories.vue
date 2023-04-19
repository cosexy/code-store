<template>
  <div class="section-spacing">
    <div class="mb-4 px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">
        Shop by Category
      </h2>
      <a href="javascript:void(0)" class="hidden items-center text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:flex" @click="toggleShow()">
        Browse all categories
        <Icon size="20" name="material-symbols:add-rounded" />
      </a>
    </div>

    <div class="-m-3">
      <div
        class="flex flex-wrap overflow-hidden"
        :class="{
          'show-default': !show
        }"
      >
        <div v-for="(category, index) in categories" :key="index" class="w-1/5 p-3">
          <div class="relative h-80 overflow-hidden rounded-md bg-white text-white">
            <img class="relative z-[1]" :src="category.imageSrc" alt="">

            <span aria-hidden="true" class="absolute inset-x-0 bottom-0 z-[2] h-2/3 bg-gradient-to-t from-gray-800 opacity-50" />

            <span class="absolute bottom-5 z-[3] w-full text-center text-xl font-bold text-white">{{ category.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 px-4 sm:hidden">
      <a href="#" class="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
        Browse all categories
        <span aria-hidden="true"> &rarr;</span>
      </a>
    </div>
  </div>
</template>

<script setup>
const categories = [
  {
    name: 'New Arrivals',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-01.jpg'
  },
  {
    name: 'Productivity',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-02.jpg'
  },
  {
    name: 'Workspace',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-04.jpg'
  },
  {
    name: 'Accessories',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-05.jpg'
  },
  { name: 'Sale', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-03.jpg' },
  {
    name: 'New Arrivals',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-01.jpg'
  },
  {
    name: 'Productivity',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-02.jpg'
  },
  {
    name: 'Workspace',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-04.jpg'
  },
  {
    name: 'Accessories',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-05.jpg'
  },
  { name: 'Sale', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-03.jpg' }
]

const [show, toggleShow] = useToggle(false)
</script>

<style>
.show-default {
    height: calc(20rem + 0.75rem + 0.75rem);
}
</style>
