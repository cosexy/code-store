<template>
  <headless-combobox-options
    v-auto-animate
    as="div"
    static
    hold
  >
    <includes-spinner :spinning="loading">
      <div class="flex divide-x divide-gray-100">
        <div
          v-if="!isEmpty"
          v-auto-animate
          :class="['max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4', activeOption && 'sm:h-96']"
        >
          <template v-if="users.length">
            <h2
              class="mb-4 mt-2 text-xs font-semibold text-gray-500"
            >
              Content creators
            </h2>
            <div class="-mx-2 text-sm text-gray-700">
              <headless-combobox-option
                v-for="user in users"
                :key="user.id"
                v-slot="{ active }"
                :value="user"
                as="template"
              >
                <div
                  :class="['group flex cursor-default select-none items-center rounded-md p-2', active && 'bg-gray-100 text-gray-900']"
                >
                  <nuxt-img
                    :src="user.avatar?.path || '/images/user.png'"
                    :provider="user.avatar?.path ? 'backend' : ''"
                    class="h-6 w-6 flex-none rounded-full"
                  />

                  <span class="ml-3 flex-auto truncate">{{ user.name }}</span>
                  <icon
                    v-if="active"
                    name="material-symbols:chevron-right-rounded"
                    class="ml-3 h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </headless-combobox-option>
            </div>
          </template>

          <template v-if="products.length">
            <h2
              class="mb-4 text-xs font-semibold text-gray-500"
              :class="[users.length && 'mt-6']"
            >
              Products
            </h2>
            <div class="-mx-2 text-sm text-gray-700">
              <headless-combobox-option
                v-for="product in products"
                :key="product.id"
                v-slot="{ active }"
                :value="product"
                as="template"
              >
                <div
                  :class="['group flex cursor-default select-none items-center rounded-md p-2', active && 'bg-gray-100 text-gray-900']"
                >
                  <nuxt-img
                    :src="product.avatar!.path"
                    provider="backend"
                    class="aspect-product h-6 flex-none rounded-md"
                  />

                  <span class="ml-3 line-clamp-1 flex-auto truncate">{{ product.name }}</span>
                  <icon
                    v-if="active"
                    name="material-symbols:chevron-right-rounded"
                    class="ml-3 h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </headless-combobox-option>
            </div>
          </template>
        </div>

        <spotlight-empty v-else class="w-full" />

        <component
          :is="activeOption.__typename === 'User' ? SpotlightUser : SpotlightProduct"
          v-if="activeOption"
          :value="activeOption"
        />
      </div>
    </includes-spinner>
  </headless-combobox-options>
</template>

<script setup lang="ts">
import { SpotlightProduct, SpotlightUser } from '#components'
import { SpotlightQuery, SpotlightQueryVariables } from '~/apollo/__generated__/graphql'

const props = defineProps<{
    activeOption?: SpotlightQuery['users'][0] | SpotlightQuery['products'][0]
    keyword: string
}>()
/**
 * Apollo Query
 */
const filter = computed<SpotlightQueryVariables>(() => ({
  users: {
    offset: 0,
    limit: 3,
    sort: 'createdAt',
    name: props.keyword
  },
  products: {
    offset: 0,
    limit: 4,
    sort: 'createdAt',
    name: props.keyword
  }
}))

const users = computed<SpotlightQuery['users']>(() => result.value?.users || [])
const products = computed<SpotlightQuery['products']>(() => result.value?.products || [])

const { result, loading } = useQuery(SpotlightDocument, filter, {
  debounce: 500
})

const isEmpty = computed(() => !loading.value && !users.value.length && !products.value.length)
</script>

<style scoped>

</style>
