<template>
  <div>
    <div class="w-full">
      <h4 class="text-[18px] font-semibold">
        Categories
      </h4>

      <div>
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="item my-5"
        >
          <div
            class="flex cursor-pointer items-center space-x-2 hover:text-indigo-600"
            :class="{
              'text-indigo-600': selected === category.id
            }"
            @click="toggleSelected(category.id)"
          >
            <div
              class="flex h-6 w-6 items-center justify-center rounded-md border-2"
              :class="[selected === category.id ? 'border-indigo-600' : 'border-gray-200']"
            >
              <icon
                name="material-symbols:check-small-rounded"
                class="transition duration-300"
                :class="{
                  'scale-0': selected !== category.id
                }"
                size="30"
              />
            </div>
            <span
              class="text-sm"
              :class="[selected === category.id ? 'font-semibold' : 'font-medium']"
            >{{ category.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CategoriesQuery } from '~/apollo/__generated__/graphql'

const props = defineProps<{
    value: string
}>()

const emit = defineEmits<{
    (event: 'update:value', value: string): void
}>()

const selected = useVModel(props, 'value', emit)

const { result } = useQuery(CategoriesDocument)
const categories = computed<CategoriesQuery['categories']>(() => result.value?.categories || [])

const toggleSelected = (id: string) => {
  if (selected.value === id) {
    selected.value = ''
  } else {
    selected.value = id
  }
}
</script>

<style scoped>

</style>
