<template>
  <div>
    <div class="w-full">
      <h4 class="text-[18px] font-semibold">
        Categories
      </h4>

      <div ref="categoriesRef">
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="item my-5 opacity-0"
        >
          <div
            class="hover:text-primary-600 flex cursor-pointer items-center space-x-2"
            :class="{
              'text-primary-600': selected === category.id
            }"
            @click="toggleSelected(category.id)"
          >
            <div
              class="border-primary-500 flex h-6 w-6 items-center justify-center rounded-lg border-2"
            >
              <div
                class="bg-primary-500 shadow-default shadow-primary-200 h-4 w-4 rounded-lg transition"
                :class="{
                  'scale-0': selected !== category.id
                }"
              />
            </div>
            <span class="font-semibold">{{ category.name }}</span>
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

const categoriesRef = ref<HTMLUListElement>()
const $anime = useAnime()
onMounted(async () => {
  await nextTick()
  $anime({
    targets: categoriesRef.value?.querySelectorAll('.item'),
    translateY: [-30, 0],
    opacity: [0, 1],
    // duration: 300,
    // easing: 'easeOutQuad',
    delay: (el: any, i: number) => 100 + 30 * i
  })
})
</script>

<style scoped>

</style>
