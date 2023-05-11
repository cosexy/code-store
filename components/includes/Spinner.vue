<template>
  <div v-auto-animate class="relative">
    <div
      v-if="spinning"
      class="absolute left-0 top-0 z-[1] flex h-full w-full items-center justify-center"
    >
      <div :class="[`dot-${type}`]" />
    </div>
    <div
      class="relative z-[0] transition-opacity duration-300"
      :class="[spinning ? 'pointer-events-none opacity-50' : '']"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { MaybeRefOrGetter } from '@vueuse/core'

const props = withDefaults(defineProps<{
  spinning?: boolean | MaybeRefOrGetter<boolean>
  type?: 'elastic' | 'pulse' | 'flashing' | 'collision' | 'revolution' | 'carousel' | 'typing' | 'windmill' | 'bricks' | 'floating' | 'fire' | 'spin' | 'falling' | 'stretching'
}>(), {
  spinning: true,
  type: 'windmill'
})
</script>

<style scoped lang="scss">
@use 'three-dots' with (
  $dot-color: #4f46e5
);
</style>
