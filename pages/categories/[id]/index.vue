<template>
  <includes-page-session :title="category.name">
    <div class="-mt-10">
      <div class="flex items-end justify-between">
        <p class="mt-4 max-w-xl text-sm text-gray-700">
          Our thoughtfully designed workspace objects are crafted in limited runs. Improve your productivity and organization with these sale items before we run out.
        </p>

        <headless-menu as="div" class="relative inline-block text-left">
          <div>
            <headless-menu-button class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
              Sort
              <icon name="charm:chevron-down" class="-mr-1 ml-1 h-5 w-5 shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
            </headless-menu-button>
          </div>

          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <headless-menu-items class="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-black/5 focus:outline-none">
              <div class="py-1">
                <headless-menu-item
                  v-for="option in sortOptions"
                  :key="option.name"
                  v-slot="{ active }"
                >
                  <a
                    :href="option.href"
                    :class="[option.current ? 'font-medium text-gray-900' : 'text-gray-500', active ? 'bg-gray-100' : '']"
                    class="block px-4 py-2 text-sm"
                  >
                    {{ option.name }}
                  </a>
                </headless-menu-item>
              </div>
            </headless-menu-items>
          </transition>
        </headless-menu>
      </div>

      <!-- Filters -->
    </div>
  </includes-page-session>
</template>

<script setup lang="ts" async>
const route = useRoute()

const { result } = await useAsyncQuery(CategoryDocument, {
  filter: {
    slug: route.params.id as string
  }
})

const category = computed(() => result.value!.category)

const { result: categoriesResult } = await useAsyncQuery(CategoriesDocument)
const categories = computed(() => categoriesResult.value!.categories)
const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false }
]
const products = [
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.'
  },
  {
    id: 2,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.'
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.'
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.'
  }
  // More products...
]
</script>

<style scoped>

</style>
