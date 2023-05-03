<template>
  <div>
    <headless-tab-group>
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
        <headless-tab-panel>
          <studio-account-info />
        </headless-tab-panel>

        <headless-tab-panel>
          <studio-account-password />
          <studio-account-sessions />
          <studio-account-delete />
        </headless-tab-panel>
      </headless-tab-panels>
    </headless-tab-group>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'setting'
})

const tabs = computed(() => ['Account', 'Security'])
</script>

<style scoped>

</style>
