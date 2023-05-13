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
            <headless-menu-items class="shadow-default absolute right-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white ring-1 ring-black ring-black/5 focus:outline-none">
              <div class="py-1">
                <headless-menu-item
                  v-for="option in sorts"
                  :key="option.name"
                  v-slot="{ active }"
                >
                  <a
                    href="javascript:void(0)"
                    :class="[active ? 'bg-gray-100' : '']"
                    class="block px-4 py-2 text-sm text-gray-600"
                    @click="vars.sort = option.value"
                  >
                    {{ option.name }}
                  </a>
                </headless-menu-item>
              </div>
            </headless-menu-items>
          </transition>
        </headless-menu>
      </div>

      <div>
        <div class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <search-categories v-model:value="vars.category" :categories="categories" :nullable="true" class="lg:col-span-3" />
          <search-result v-model:filter="vars" class="lg:col-span-9" />
        </div>
      </div>
    </div>
  </includes-page-session>
</template>

<script setup lang="ts" async>
import { GetProductsFilter } from '~/apollo/__generated__/graphql'

const route = useRoute()

const { result } = await useAsyncQuery(CategoryDocument, {
  filter: {
    slug: route.params.id as string
  }
})

const category = computed(() => result.value!.category)

const sorts = computed(() => [
  {
    name: 'Created At',
    value: 'createdAt'
  },
  {
    name: 'Updated At',
    value: 'updatedAt'
  },
  {
    name: 'Name',
    value: 'name'
  }
])

const { result: categoriesResult } = await useAsyncQuery(CategoriesDocument)
const categories = computed(() => categoriesResult.value!.categories)

const vars = ref<Pick<GetProductsFilter, 'category' | 'name' | 'sort'>>({
  category: category.value.id,
  name: '',
  sort: 'createdAt'
})

const router = useRouter()
watch(() => vars.value.category, (val) => {
  if (val) {
    const _category = categories.value.find((category) => category.id === val)
    if (_category) {
      router.push({
        name: 'categories-id',
        params: {
          id: _category.slug
        }
      })
    }
  }
})
</script>

<style scoped>

</style>
