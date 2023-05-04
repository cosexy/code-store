<template>
  <div>
    <slot :src="src" :provider="provider" :open="open" :reset="reset" />
  </div>
</template>

<script setup lang="ts">
import { ImageItemFragment } from '~/apollo/__generated__/graphql'

const props = defineProps<{
  value?: Pick<ImageItemFragment, 'id' | 'path'>
}>()
// emit v-model
const emits = defineEmits<{
  (event: 'update:value', value?: string): void
}>()
const _value = useVModel(props, 'value', emits)

const { upload, onResult } = useUpload()
const { files, open, reset } = useFileDialog({
  multiple: false,
  accept: 'image/*'
})

watch(files, (files) => files?.length && upload(files[0]))

const afterUpload = (files: Pick<ImageItemFragment, 'id' | 'path'>[]) => {
  if (files.length) {
    _value.value = {
      id: files[0].id,
      path: files[0].path
    }
  }
  reset()
}

onResult(afterUpload)

// render data
const src = computed(() => _value.value?.path || '/images/user.png')
const provider = computed(() => _value.value?.path ? 'backend' : '')
</script>

<style scoped>

</style>
