<template>
  <HeadlessTransitionRoot appear :show="modal.actived" as="template">
    <HeadlessDialog as="div" class="relative z-50" @close="close()">
      <HeadlessTransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black opacity-25" />
      </HeadlessTransitionChild>
      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <HeadlessTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <HeadlessDialogPanel class="flex w-full text-left text-base transition md:my-8 md:max-w-lg md:px-4">
              <div class="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <button type="button" class="absolute right-4 top-4 text-gray-400 outline-0 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8" @click="close">
                  <span class="sr-only">Close</span>
                  <Icon name="heroicons-solid:x-mark" class="h-6 w-6" aria-hidden="true" />
                </button>

                <slot :data="modal.data" :actived="modal.actived" />
              </div>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
}>()
const { modal, close } = useDialog(props.name)
</script>
