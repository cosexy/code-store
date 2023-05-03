<template>
  <headless-popover-group>
    <headless-popover class="relative">
      <headless-popover-button class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 focus:outline-0">
        Product
        <Icon name="heroicons-solid:chevron-down" class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
      </headless-popover-button>

      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-1"
      >
        <headless-popover-panel class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
          <div class="p-4">
            <div v-for="item in products" :key="item.name" class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
              <div class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                <Icon :name="item.icon" class="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
              </div>
              <div class="flex-auto">
                <a :href="item.href" class="block font-semibold text-gray-900">
                  {{ item.name }}
                  <span class="absolute inset-0" />
                </a>
                <p class="mt-1 text-gray-600">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
            <a v-for="item in callsToAction" :key="item.name" :href="item.href" class="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
              <Icon class="h-5 w-5 flex-none text-gray-400" :name="item.icon" />
              {{ item.name }}
            </a>
          </div>
        </headless-popover-panel>
      </Transition>
    </headless-popover>

    <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Features</a>
    <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Marketplace</a>
    <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Company</a>
  </headless-popover-group>
</template>

<script lang="ts" setup>
defineProps<{
  products: any[]
  callsToAction: any[]
}>()
</script>

<style scoped></style>
