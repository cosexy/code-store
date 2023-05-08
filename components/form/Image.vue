<template>
  <div>
    <slot :src="src" :provider="provider" :open="open" :reset="reset" />
  </div>
</template>

<script setup lang="ts">
import { Image } from '~/apollo/__generated__/graphql'

interface Props {
  value?: Pick<Image, 'id' | 'path'>
}

const props = defineProps<{
  value?: Props['value']
}>()
// emit v-model
const emits = defineEmits<{
  (event: 'update:value', value?: Props['value']): void
  (event: 'change', value: Pick<Image, 'id' | 'path'>): void
}>()
const _value = useVModel(props, 'value', emits)

const { upload, onResult } = useUpload()
const { files, open, reset } = useFileDialog({
  multiple: false,
  accept: 'image/*'
})

watch(files, (files) => files?.length && upload(files[0]))

const afterUpload = (files: Props['value'][]) => {
  if (files.length) {
    _value.value = {
      id: files[0]!.id,
      path: files[0]!.path
    }
  }
  reset()
}

onResult(afterUpload)

// render data
const src = computed(() => _value.value?.path)
const provider = computed(() => _value.value?.path ? 'backend' : '')
</script>

<style scoped>

</style>
