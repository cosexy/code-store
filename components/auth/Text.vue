<template>
  <div class="relative pb-2 pt-1">
    <div class="flex items-center">
      <label v-if="$slots['prefix']" class="block pr-2.5">
        <slot name="prefix" />
      </label>

      <input
        ref="target"
        v-model="_value"
        class="block flex-1 bg-transparent focus:outline-none"
        :placeholder="placeholder"
        :type="type"
      >

      <slot name="suffix" />
    </div>

    <div v-if="errorMessage" ref="errorField" class="mt-2 text-xs text-red-500 opacity-0">
      {{ errorMessage }}
    </div>

    <span
      class="absolute bottom-0 left-0 block h-0.5 w-full transition duration-300 ease-in-out"
      :class="{
        'bg-primary-600': focused,
        'bg-gray-200': !focused
      }"
    />
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  placeholder?: string,
  value?: string,
  type?: string,
  validate?: () => string,
}>(), {
  placeholder: '',
  value: '',
  type: 'text',
  validate: () => ''
})

const emits = defineEmits<{
  (e: 'update:value', value: string): void
}>()
const _value = useVModel(props, 'value', emits)

const target = ref()
const { focused } = useFocus(target)
const errorMessage = ref<string>('')
</script>
