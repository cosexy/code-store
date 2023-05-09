<template>
  <headless-tab-group :default-index="initTab" @change="changeTab">
    <headless-tab-list
      as="header"
      class="border-b border-white/5"
    >
      <nav class="flex overflow-x-auto py-4">
        <ul
          role="list"
          class="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
        >
          <headless-tab
            v-for="item in tabs"
            :key="item"
            v-slot="{ selected }"
            as="template"
          >
            <li>
              <a
                href="javascript:void(0)"
                :class="selected ? 'text-indigo-400' : ''"
                class="focus:outline-0"
              >
                {{ item }}
              </a>
            </li>
          </headless-tab>
        </ul>
      </nav>
    </headless-tab-list>

    <headless-tab-panels class="divide-y divide-white/5">
      <slot />
    </headless-tab-panels>
  </headless-tab-group>
</template>

<script setup lang="ts">
const props = defineProps<{
  tabs: string[]
  activeTab?: string
}>()

if (!props.tabs.length) {
  throw new Error('Tabs must have at least one tab')
}

const router = useRouter()
const route = useRoute()

/**
 * Get init tab via route.query.tab. If not found...
 * If the active tab is in the tabs array, redirect to the first tab
 * use toLowerCase to avoid case sensitive
 * return to index
 */
const initTab = computed(() => {
  const tab = route.query.tab as string
  if (tab) {
    const index = props.tabs.findIndex(item => item.toLowerCase() === tab.toLowerCase())
    if (index > -1) {
      return index
    }
  }
  router.replace({ query: { tab: props.tabs[0].toLowerCase() } })
  return 0
})

const changeTab = (index: number) => {
  router.replace({ query: { tab: props.tabs[index].toLowerCase() } })
}

</script>

<style scoped>

</style>
