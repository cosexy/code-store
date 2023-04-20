<template>
  <div id="project-tabs" class="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
    <headless-tab-group as="div">
      <div class="border-b border-gray-200">
        <headless-tab-list class="-mb-px flex space-x-8">
          <headless-tab
            v-for="item in tabs"
            :key="item.name"
            v-slot="{ selected }"
            as="template"
          >
            <button
              :class="[selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800']"
              class="whitespace-nowrap border-b-2 py-6 text-sm font-medium focus:outline-0"
            >
              {{ item.name }}
            </button>
          </headless-tab>
        </headless-tab-list>
      </div>

      <headless-tab-panels as="template">
        <component :is="item.component" v-for="item in tabs" :key="item.name" />
      </headless-tab-panels>
    </headless-tab-group>
  </div>
</template>

<script lang="ts" setup>
import { ProductReviews, ProductFaqs, ProductLisence } from '#components'

const tabs = computed(() => [
  {
    name: 'Customer Reviews',
    component: ProductReviews
  },
  {
    name: 'FAQ',
    component: ProductFaqs
  },
  {
    name: 'License',
    component: ProductLisence
  }
])

</script>

<style scoped></style>
