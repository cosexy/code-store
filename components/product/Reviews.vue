<template>
  <div class="-mb-10 pt-6">
    <h3 class="sr-only">
      Customer Reviews
    </h3>

    <div>
      <h4 class="sr-only">
        Reviews Tools
      </h4>

      <div class="flex items-center">
        <template v-if="count">
          <div class="mb-1 flex items-center">
            <Icon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" name="ic:round-star-rate" :class="[average >= rating ? 'text-yellow-400' : 'text-gray-300', 'h-5 w-5 shrink-0']" aria-hidden="true" />
          </div>
          <p class="ml-1.5 mr-auto">
            <span class="text-lg font-medium text-gray-900">
              {{ average }}
            </span>
            <span class="sr-only">
              out of 5 stars
            </span>
            <span class="text-sm font-medium text-gray-600">
              based on {{ count }} reviews
            </span>
          </p>
        </template>

        <button
          type="button"
          class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          @click="open(productId)"
        >
          <icon name="material-symbols:edit-outline-rounded" class="-ml-0.5 h-5 w-5" aria-hidden="true" />
          {{ count ? 'Add a review' : 'Leave the first review' }}
        </button>
      </div>
    </div>

    <product-discuss
      v-if="count"
      :count="count"
      :product-id="productId"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  productId: string
}>()

const { result } = useQuery(ReviewInformationDocument, {
  product: props.productId
})

const count = computed(() => result.value?.reviewCount || 0)
const average = computed(() => result.value?.reviewAverage || 0)

const { open } = useDialog<string>('add-review')
</script>

<style scoped></style>
