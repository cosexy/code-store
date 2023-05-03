<template>
  <div>
    <slot :src="src" :provider="provider" :open="open" :reset="reset" />
  </div>
</template>

<script setup lang="ts">
import { ImageItemFragment } from '~/apollo/__generated__/graphql'

const props = defineProps<{
  image?: Pick<ImageItemFragment, 'id' | 'path'>
  value?: string
}>()
// emit v-model
const emits = defineEmits<{
  (event: 'update:value', value?: string): void
  (event: 'update:image', value?: Pick<ImageItemFragment, 'id' | 'path'>): void
}>()
const _image = useVModel(props, 'image', emits)
const _value = useVModel(props, 'value', emits)

const { upload, onResult } = useUpload()
const { files, open, reset } = useFileDialog({
  multiple: false,
  accept: 'image/*'
})

watch(files, (files) => files?.length && upload(files[0]))

const afterUpload = (files: Pick<ImageItemFragment, 'id' | 'path'>[]) => {
  if (files.length) {
    _image.value = files[0]
    _value.value = _image.value.id
  }
  reset()
}

onResult(afterUpload)

// render data
const src = computed(() => _image.value?.path || '/images/user.png')
const provider = computed(() => _image.value?.path ? 'backend' : '')
</script>

<style scoped>

</style>
