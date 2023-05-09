<template>
  <div>
    <slot :src="src" :provider="provider" :open="open" :reset="reset" />
  </div>
</template>

<script setup lang="ts">
import { UseFileDialogOptions } from '@vueuse/core'
import { Image, Document } from '~/apollo/__generated__/graphql'

type FileType = Pick<Image, 'id' | 'path'> | Pick<Document, 'id' | 'path'>

interface Props {
  value?: FileType | FileType[]
  config?: UseFileDialogOptions
}

const props = defineProps<Props>()
// emit v-model
const emits = defineEmits<{
  (event: 'update:value', value?: Props['value']): void
  (event: 'change', value: Props['value']): void
}>()

const _value = useVModel(props, 'value', emits)

const { upload, onResult } = useUpload()
const { files, open, reset } = useFileDialog(props.config)

watch(files, (files) => files?.length && upload(files))

const toArrayItem = (file: FileType) => {
  return {
    id: file.id,
    path: file.path
  }
}

const afterUpload = (files: FileType[]) => {
  if (files.length) {
    // if array then loop and push to arrray
    if (Array.isArray(_value.value)) {
      _value.value.push(...files.map(toArrayItem))
    } else {
      _value.value = toArrayItem(files[0])
    }
  }
  reset()
}

onResult(afterUpload)

// render data
const src = computed(() => _value.value)
const provider = computed(() => 'backend')
</script>

<style scoped>

</style>
