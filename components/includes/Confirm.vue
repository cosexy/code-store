<template>
  <headless-popover class="relative" as="templete">
    <headless-popover-button>
      <slot />
    </headless-popover-button>
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <headless-popover-panel
        v-slot="{ close }"
        class="absolute overflow-hidden rounded-md shadow"
        :class="[className]"
      >
        <div class="space-y-3 bg-gray-700 p-3 text-white">
          <div class="flex items-center space-x-1.5">
            <icon name="ph:seal-warning-fill" />
            <span>
              {{ message }}
            </span>
          </div>

          <div class="flex justify-end space-x-2">
            <button
              type="button"
              class="rounded bg-white/10 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-white/20"
              @click="cancel(close)"
            >
              {{ cancelText }}
            </button>
            <button
              type="button"
              class="rounded bg-indigo-500 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              @click="ok(close)"
            >
              {{ okText }}
            </button>
          </div>
        </div>
      </headless-popover-panel>
    </transition>
  </headless-popover>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  message: string
  okText?: string
  cancelText?: string
  class?: string
}>(), {
  okText: 'Ok',
  cancelText: 'Cancel',
  class: 'right-0 z-10 mt-3'
})

const className = computed(() => props.class)

const emit = defineEmits<{
  (e: 'ok'): void
  (e: 'cancel'): void
}>()

const ok = (close: () => void) => {
  emit('ok')
  close()
}

const cancel = (close: () => void) => {
  emit('cancel')
  close()
}
</script>

<style scoped>

</style>
