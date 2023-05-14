<template>
  <div class="sm:flex sm:flex-1 sm:items-center sm:justify-between">
    <div>
      <p class="text-sm text-gray-500">
        Showing
        {{ ' ' }}
        <span class="font-medium">
          {{ showingFrom }}
        </span>
        {{ ' ' }}
        to
        {{ ' ' }}
        <span class="font-medium">
          {{ showingTo }}
        </span>
        {{ ' ' }}
        of
        {{ ' ' }}
        <span class="font-medium">{{ total }}</span>
        {{ ' ' }}
        results
      </p>
    </div>
    <div>
      <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <a
          href="javascript:void(0)"
          class="relative inline-flex items-center rounded-l-md p-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-indigo-600 dark:hover:text-white"
          :class="[isFirstPage ? 'pointer-events-none' : '']"
          @click="prev"
        >
          <span class="sr-only">Previous</span>
          <icon name="majesticons:chevron-left" class="h-5 w-5" aria-hidden="true" />
        </a>

        <a
          v-for="(item, index) in pages"
          :key="index"
          href="javascript:void(0)"
          class="relative inline-flex items-center px-4 py-2 text-sm font-semibold"
          :class="{
            'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600': item === currentPage,
            'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-gray-800 dark:hover:text-white': item !== currentPage
          }"
          @click="currentPage = item"
        >
          {{ item }}
        </a>

        <a
          href="javascript:void(0)"
          class="relative inline-flex items-center rounded-r-md p-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-indigo-600 dark:hover:text-white"
          :class="[isLastPage ? 'pointer-events-none' : '']"
          @click="next"
        >
          <span class="sr-only">Next</span>
          <icon name="majesticons:chevron-right" class="h-5 w-5" aria-hidden="true" />
        </a>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UnwrapNestedRefs } from 'vue-demi'
import { UseOffsetPaginationReturn } from '@vueuse/core'

const props = withDefaults(defineProps<{
  total: number
  page?: number
  pageSize?: number
}>(), {
  page: 1,
  pageSize: 10
})

const emit = defineEmits<{
  (event: 'change', value: UnwrapNestedRefs<UseOffsetPaginationReturn>): void
}>()

const _total = toRef(props, 'total')
const _page = ref(props.page)
const _pageSize = ref(props.pageSize)

// pick near page to render like 1, 2, 3 4 5, 6, 7 with ... with 4 curent page
const pages = computed(() => {
  const page = _page.value
  const total = _total.value
  const pageSize = _pageSize.value

  const nearPage = []
  const maxNearPage = 5
  const maxPage = Math.ceil(total / pageSize)

  if (page <= 3) {
    for (let i = 1; i <= Math.min(maxNearPage, maxPage); i++) {
      nearPage.push(i)
    }
  } else if (page >= maxPage - 2) {
    for (let i = Math.max(maxPage - maxNearPage + 1, 1); i <= maxPage; i++) {
      nearPage.push(i)
    }
  } else {
    for (let i = page - 2; i <= page + 2; i++) {
      nearPage.push(i)
    }
  }

  return nearPage
})

const onPageChange = (value: UnwrapNestedRefs<UseOffsetPaginationReturn>) => {
  emit('change', value)
}

const {
  currentPage,
  isFirstPage,
  isLastPage,
  prev,
  next
} = useOffsetPagination({
  total: _total,
  page: _page,
  pageSize: _pageSize,
  onPageChange,
  onPageSizeChange: onPageChange
})

const showingFrom = computed(() => {
  return (currentPage.value - 1) * _pageSize.value + 1
})
const showingTo = computed(() => {
  return currentPage.value * _pageSize.value > _total.value ? _total.value : currentPage.value * _pageSize.value
})
</script>

<style scoped>

</style>
