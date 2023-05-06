<template>
  <editor
    api-key="no-api-key"
    :init="config"
  />
</template>

<script setup lang="ts">
import Editor from '@tinymce/tinymce-vue'
import { TinyMCE } from 'tinymce'

const config: Parameters<TinyMCE['init']>[0] = {
  height: 500,
  menubar: false,
  skin: 'oxide-dark',
  content_css: 'dark',
  plugins: [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount'
  ],
  toolbar: 'undo redo | formatselect | bold italic backcolor |  alignleft aligncenter alignright alignjustify |  bullist numlist outdent indent | removeformat | help'
}
</script>

<style scoped>

</style>
