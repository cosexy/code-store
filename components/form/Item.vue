<template>
  <div v-auto-animate class="space-y-2">
    <slot name="label" />
    <label
      v-if="!$slots['label']"
      :for="props.name"
      class="block text-sm font-medium leading-6 text-white"
      :class="{
        'sr-only': !label
      }"
    >
      {{ props.label }}
    </label>

    <div
      :class="{
        'flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset': prefix || $slots['prefix'],
        'ring-rose-500 focus-within:ring-rose-500': prefix && message,
        'focus-within:ring-indigo-500': prefix && !message
      }"
    >
      <span class="flex select-none items-center pl-3 text-gray-400 empty:hidden sm:text-sm">
        <slot name="prefix" />
        <template v-if="!$slots['prefix']">{{ prefix }}</template>
      </span>
      <slot :message="message" />
    </div>

    <slot name="error" />
    <p v-if="!$slots['error'] && message" class="text-sm text-rose-600">
      {{ message }}
    </p>

    <p v-if="extra" class="text-xs leading-6 text-gray-400">
      {{ extra }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string
  label?: string
  prefix?: string
  extra?: string
}

const props = defineProps<Props>()

const { messages, rules } = useFormContext('FormItem')
const rule = rules[props.name]

const message = computed({
  get: () => messages.value[props.name],
  set: (value) => {
    messages.value[props.name] = value
  }
})

if (rule) {
  messages.value[props.name] = ''

  watch(message, (value) => {
    if (value) {
      setTimeout(() => {
        message.value = ''
      }, 5000)
    }
  })

  onUnmounted(() => {
    delete messages.value[props.name]
  })
}
</script>

<style scoped>

</style>
