<template>
  <div>
    <includes-teleport to="#page-title">
      <h2 class="text-lg font-medium text-gray-200">
        Categories
      </h2>
    </includes-teleport>

    <includes-teleport to="#actions">
      <button
        class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        @click="open"
      >
        <icon
          :name="loading ? 'line-md:loading-twotone-loop' : 'material-symbols:add-rounded'"
          class="-ml-0.5 h-5 w-5"
          aria-hidden="true"
        />
        Add New
      </button>
    </includes-teleport>

    <client-only>
      <includes-spinner :spinning="loading">
        <table
          class="w-full whitespace-nowrap text-left"
        >
          <colgroup>
            <col class="lg:w-2/12">
            <col class="lg:w-2/12">
            <col class="lg:w-6/12">
            <col class="lg:w-2/12">
          </colgroup>
          <thead class="border-b border-white/10 text-sm leading-6 text-white">
            <tr>
              <!-- Avatar -->
              <th scope="col" class="py-2 pl-4 pr-8 font-semibold sm:table-cell sm:pl-6 lg:pl-8">
                Category
              </th>

              <!-- Name -->
              <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">
                Name
              </th>

              <!-- Price -->
              <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">
                Description
              </th>

              <th scope="col" class="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8">
                Action
              </th>
            </tr>
          </thead>
          <tbody
            class="divide-y divide-white/5"
          >
            <studio-categories-item
              v-for="category in items"
              :key="category.id"
              :category="category"
            />
          </tbody>
        </table>

        <div class="border-t border-white/10 px-8 py-4">
          <includes-pagination
            :total="count"
            :page-size="5"
            @change="value => toPage(value.currentPage)"
          />
        </div>
      </includes-spinner>
    </client-only>

    <modal-category />
  </div>
</template>

<script setup lang="ts" async>

const { open } = useDialog('category')
// categories
const { result: categoriesResult } = await useAsyncQuery(StudioCategoriesDocument)
const categories = computed(() => categoriesResult.value?.categories || [])

const count = computed(() => categories.value.length || 0)

const { items, options, toPage } = useAutoPagination(categories, count, {
  offset: 0,
  limit: 4
})

const loading = useMutationLoading()
</script>
