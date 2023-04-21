<template>
  <headless-dialog as="div" class="lg:hidden" :open="_open" @close="_open = false">
    <div class="fixed inset-0 z-10" />
    <headless-dialog-panel class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
      <div class="flex items-center justify-between">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="">
        </a>
        <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="_open = false">
          <span class="sr-only">Close menu</span>
          <Icon name="heroicons-solid:x-mark" class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="mt-6 flow-root">
        <div class="-my-6 divide-y divide-gray-500/10">
          <div class="space-y-2 py-6">
            <headless-disclosure v-slot="{ open }" as="div" class="-mx-3">
              <headless-disclosure-button class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-50">
                Product
                <Icon name="heroicons-solid:chevron-down" :class="[open ? 'rotate-180' : '', 'h-5 w-5 flex-none']" aria-hidden="true" />
              </headless-disclosure-button>
              <headless-disclosure-panel class="mt-2 space-y-2">
                <headless-disclosure-button v-for="item in menu" :key="item.name" as="a" :href="item.href" class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  {{ item.name }}
                </headless-disclosure-button>
              </headless-disclosure-panel>
            </headless-disclosure>
            <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Features</a>
            <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Marketplace</a>
            <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Company</a>
          </div>
          <div class="py-6">
            <a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</a>
          </div>
        </div>
      </div>
    </headless-dialog-panel>
  </headless-dialog>
</template>

<script lang="ts" setup>
const props = defineProps<{
  open: boolean,
  menu: any
}>()

const emits = defineEmits<{
  (e: 'update:open'): void
}>()
const _open = useVModel(props, 'open', emits)

</script>

<style scoped></style>
