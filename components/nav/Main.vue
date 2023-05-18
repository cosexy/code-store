<template>
  <div class="bg-white">
    <!-- Mobile menu -->
    <nav-mobile-menu v-model:open="open" />

    <header class="shadow-default fixed left-0 top-0 z-30 w-full bg-white">
      <nav aria-label="Top" class="mx-auto flex h-[80px] max-w-7xl items-center">
        <button type="button" class="rounded-md bg-white p-2 text-gray-400 lg:hidden" @click="toggleOpen()">
          <span class="sr-only">Open menu</span>
          <Icon name="heroicons:bars-3" class="h-6 w-6" aria-hidden="true" />
        </button>

        <!-- Logo -->
        <div class="ml-4 flex lg:ml-0">
          <nuxt-link to="/">
            <span class="sr-only">Your Company</span>
            <nuxt-img class="h-8 w-auto" src="/images/logo.png" />
          </nuxt-link>
        </div>

        <!-- Flyout menus -->
        <headless-popover-group class="hidden lg:ml-8 lg:block lg:self-stretch">
          <div class="flex h-full space-x-8">
            <headless-popover v-for="category in navigation.categories" :key="category.name" v-slot="{ open }" class="flex">
              <div class="relative flex">
                <headless-popover-button
                  :class="[open ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-700 hover:text-gray-800']"
                  class="relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out focus:outline-0"
                >
                  {{ category.name }}
                </headless-popover-button>
              </div>

              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <headless-popover-panel class="absolute inset-x-0 top-full z-10 text-sm text-gray-500">
                  <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                  <div class="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                  <div class="relative bg-white">
                    <div class="mx-auto max-w-7xl px-8">
                      <div class="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                        <div class="col-start-2 grid grid-cols-2 gap-x-8">
                          <div v-for="item in category.featured" :key="item.name" class="group relative text-base sm:text-sm">
                            <div class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                              <img :src="item.imageSrc" :alt="item.imageAlt" class="object-cover object-center">
                            </div>
                            <a :href="item.href" class="mt-6 block font-medium text-gray-900">
                              <span class="absolute inset-0 z-10" aria-hidden="true" />
                              {{ item.name }}
                            </a>
                            <p aria-hidden="true" class="mt-1">
                              Shop now
                            </p>
                          </div>
                        </div>
                        <div class="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                          <div v-for="section in category.sections" :key="section.name">
                            <p :id="`${section.name}-heading`" class="font-medium text-gray-900">
                              {{ section.name }}
                            </p>
                            <ul role="list" :aria-labelledby="`${section.name}-heading`" class="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                              <li v-for="item in section.items" :key="item.name" class="flex">
                                <a :href="item.href" class="hover:text-gray-800">{{ item.name }}</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </headless-popover-panel>
              </transition>
            </headless-popover>

            <a v-for="page in navigation.pages" :key="page.name" :href="page.href" class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">{{ page.name }}</a>
          </div>
        </headless-popover-group>

        <nav-actions />
      </nav>
    </header>

    <div style="height: 80px" />
  </div>
</template>

<script setup lang="ts">
const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Wordpress',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.'
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.'
        }
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Dresses', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Denim', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' }
          ]
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' }
          ]
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Significant Other', href: '#' }
          ]
        }
      ]
    },
    {
      id: 'men',
      name: 'Google Cloud',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.'
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.'
        }
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' }
          ]
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' }
          ]
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' }
          ]
        }
      ]
    }
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: 'http://localhost:3003/studio/account?tab=account' }
  ]
}
const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    price: '$32.00',
    color: 'Sienna',
    inStock: true,
    size: 'Large',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in sienna."
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    price: '$32.00',
    color: 'Black',
    inStock: false,
    leadTime: '3–4 weeks',
    size: 'Large',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg',
    imageAlt: "Front of men's Basic Tee in black."
  },
  {
    id: 3,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35.00',
    color: 'White',
    inStock: true,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg',
    imageAlt: 'Insulated bottle with white base and black snap lid.'
  }
]

const [open, toggleOpen] = useToggle(false)
</script>
