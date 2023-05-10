<template>
  <tr class="text-sm text-gray-400">
    <!-- Avatar -->
    <th scope="col" class="py-2 pl-4 pr-8 sm:pl-6 lg:pl-8">
      <div class="aspect-product h-[100px] overflow-hidden rounded-md">
        <nuxt-img
          :src="product.avatar.path"
          provider="backend"
          class="h-full w-full object-cover transition hover:scale-105"
        />
      </div>
    </th>

    <!-- Name -->
    <th scope="col" class="hidden py-2 pl-0 pr-8 font-normal sm:table-cell">
      {{ product.name }}
    </th>

    <!-- Version -->
    <th scope="col" class="hidden py-2 pl-0 pr-8 text-center font-normal md:table-cell lg:pr-20">
      {{ product.version }}
    </th>

    <!-- Price -->
    <th scope="col" class="hidden py-2 pl-0 pr-8 font-normal md:table-cell lg:pr-20">
      {{ product.price }}
    </th>

    <!-- Sale -->
    <th scope="col" class="hidden py-2 pl-0 pr-8 font-normal md:table-cell lg:pr-20">
      {{ product.sale }}
    </th>

    <th scope="col" class="hidden py-2 pl-0 pr-4 text-right font-normal sm:table-cell sm:pr-6 lg:pr-8">
      <div class="space-x-2">
        <includes-confirm
          message="Are you sure ?"
          @ok="remove({ input: { id: product.id } })"
        >
          <button
            type="button"
            class="rounded bg-rose-500 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
            :disabled="removeLoading"
            :class="{
              'cursor-not-allowed opacity-50': removeLoading
            }"
          >
            Remove
          </button>
        </includes-confirm>
        <button
          type="button"
          class="rounded bg-indigo-500 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          @click="$router.push(`/studio/products/${product.id}`)"
        >
          Edit
        </button>
      </div>
    </th>
  </tr>
</template>

<script setup lang="ts">
import { StudioProductsQuery } from '~/apollo/__generated__/graphql'

const props = defineProps<{
  product: StudioProductsQuery['studioProducts'][0]
}>()

const { mutate: remove, loading: removeLoading, onDone: afterRemoved } = useMutation(RemoveProductDocument)

const { client } = useApolloClient()

const emit = defineEmits<{
  (e: 'deleted'): void
}>()

afterRemoved(() => {
  client.cache.evict({
    id: client.cache.identify(props.product)
  })
  emit('deleted')
})
</script>

<style scoped>

</style>
