<template>
  <div>
    <nuxt-img
      :src="_image?.path || '/images/user.png'"
      alt=""
      class="h-24 w-24 flex-none cursor-pointer rounded-lg bg-gray-800 object-cover"
      :provider="_image?.path ? 'backend' : ''"
      @click="open"
    />
    <div>
      <button
        type="button"
        class="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
        @click="open"
      >
        Change avatar
      </button>
      <p class="mt-2 text-xs leading-5 text-gray-400">
        JPG, GIF or PNG. 10MB max.
      </p>
    </div>
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
</script>

<style scoped>

</style>
