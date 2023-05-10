<template>
  <Editor
    v-model="text"
    api-key="tsh7eq005xx3m9pm3chxowf4qdigs5iorj38qop6q2ho8ac1"
    :init="config"
  />
</template>

<script setup lang="ts">
import Editor from '@tinymce/tinymce-vue'
import type { RawEditorOptions } from 'tinymce'

const props = withDefaults(defineProps<{
  value: string | any
  config?: Partial<RawEditorOptions>
}>(), {
  value: '',
  config: Object.create({})
})

const config = computed<RawEditorOptions>(() => ({
  plugins: 'lists link image table code help wordcount',
  skin: 'oxide-dark',
  content_css: 'dark',
  ...props.config
}))

const emit = defineEmits<{
  (event: 'update:value', value: string): void
}>()

const text = useVModel(props, 'value', emit)
</script>

<style scoped>

</style>
