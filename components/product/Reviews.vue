<template>
  <div class="-mb-10 pt-6">
    <h3 class="sr-only">
      Customer Reviews
    </h3>

    <div>
      <h4 class="sr-only">
        Reviews Tools
      </h4>

      <button
        type="button"
        class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        @click="open(productId)"
      >
        <icon name="material-symbols:edit-outline-rounded" class="-ml-0.5 h-5 w-5" aria-hidden="true" />
        Leave the first review
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  productId: string
}>()

const { result } = useQuery(CountReviewDocument, {
  filter: {
    product: props.productId
  }
})

const count = computed(() => result.value?.reviewCount || 0)

const { open } = useDialog<string>('add-review')
</script>

<style scoped></style>
