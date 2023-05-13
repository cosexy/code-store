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
            <HeadlessDialogPanel class="border-primary relative w-full max-w-md overflow-hidden border-t-4 bg-white p-6 text-left align-middle shadow-xl transition-all">
              <HeadlessDialogTitle
                v-if="title"
                as="h3"
                class="mb-3 text-xl font-semibold leading-6 text-gray-900"
              >
                {{ title }}
              </HeadlessDialogTitle>

              <HeadlessDialogTitle
                v-if="$slots['title']"
                as="h3"
              >
                <slot name="title" />
              </HeadlessDialogTitle>

              <button type="button" class="absolute right-4 top-4 text-gray-400 outline-0 hover:text-gray-500 sm:right-5 sm:top-5" @click="close">
                <span class="sr-only">Close</span>
                <Icon name="heroicons:x-mark-20-solid" class="h-5 w-5" aria-hidden="true" />
              </button>

              <slot :data="modal.data" :actived="modal.actived" />
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string
  name: string
  actived?: boolean
  data?: any
}>()
const { modal, close } = useDialog(props.name, { actived: props.actived, data: props.data })
</script>
