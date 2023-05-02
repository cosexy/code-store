<template>
  <headless-transition-root as="template" :show="_open">
    <headless-dialog as="div" class="relative z-40 lg:hidden" @close="_open = false">
      <headless-transition-child
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </headless-transition-child>

      <div class="fixed inset-0 z-40 flex">
        <headless-transition-child
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <headless-dialog-panel class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
            <div class="flex px-4 pb-2 pt-5">
              <button type="button" class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400" @click="open = false">
                <span class="sr-only">Close menu</span>
                <XMarkIconOutline class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <!-- Links -->
            <headless-tab-group as="div" class="mt-2">
              <div class="border-b border-gray-200">
                <headless-tab-list class="-mb-px flex space-x-8 px-4">
                  <headless-tab v-for="category in navigation.categories" :key="category.name" v-slot="{ selected }" as="template">
                    <button :class="[selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900', 'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium']">
                      {{ category.name }}
                    </button>
                  </headless-tab>
                </headless-tab-list>
              </div>
              <headless-tab-panels as="template">
                <headless-tab-panel v-for="category in navigation.categories" :key="category.name" class="space-y-10 px-4 pb-8 pt-10">
                  <div class="grid grid-cols-2 gap-x-4">
                    <div v-for="item in category.featured" :key="item.name" class="group relative text-sm">
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
                  <div v-for="section in category.sections" :key="section.name">
                    <p :id="`${category.id}-${section.id}-heading-mobile`" class="font-medium text-gray-900">
                      {{ section.name }}
                    </p>
                    <ul role="list" :aria-labelledby="`${category.id}-${section.id}-heading-mobile`" class="mt-6 flex flex-col space-y-6">
                      <li v-for="item in section.items" :key="item.name" class="flow-root">
                        <a :href="item.href" class="-m-2 block p-2 text-gray-500">{{ item.name }}</a>
                      </li>
                    </ul>
                  </div>
                </headless-tab-panel>
              </headless-tab-panels>
            </headless-tab-group>

            <div class="space-y-6 border-t border-gray-200 px-4 py-6">
              <div v-for="page in navigation.pages" :key="page.name" class="flow-root">
                <a :href="page.href" class="-m-2 block p-2 font-medium text-gray-900">{{ page.name }}</a>
              </div>
            </div>

            <div class="space-y-6 border-t border-gray-200 px-4 py-6">
              <div class="flow-root">
                <a href="#" class="-m-2 block p-2 font-medium text-gray-900">Sign in</a>
              </div>
              <div class="flow-root">
                <a href="#" class="-m-2 block p-2 font-medium text-gray-900">Create account</a>
              </div>
            </div>

            <div class="border-t border-gray-200 px-4 py-6">
              <a href="#" class="-m-2 flex items-center p-2">
                <img src="https://tailwindui.com/img/flags/flag-canada.svg" alt="" class="block h-auto w-5 shrink-0">
                <span class="ml-3 block text-base font-medium text-gray-900">CAD</span>
                <span class="sr-only">, change currency</span>
              </a>
            </div>
          </headless-dialog-panel>
        </headless-transition-child>
      </div>
    </headless-dialog>
  </headless-transition-root>
</template>

<script lang="ts" setup>
const props = defineProps<{
  open: boolean
}>()

const emits = defineEmits<{
  (e: 'update:open'): void
}>()
const _open = useVModel(props, 'open', emits)

const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
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
      name: 'Men',
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
    { name: 'Stores', href: '#' }
  ]
}

</script>

<style scoped></style>
