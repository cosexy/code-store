<template>
  <div class="prose prose-slate dark:prose-invert mx-auto max-w-none">
    <div ref="el" />
  </div>
</template>

<script lang="ts" setup>
import type { API, OutputData } from '@editorjs/editorjs'

import Header from '@editorjs/header'
import List from '@editorjs/list'
import CodeTool from '@editorjs/code'
import QuoteTool from '@editorjs/quote'
import DelimiterTool from '@editorjs/delimiter'
import TableTool from '@editorjs/table'
import RawTool from '@editorjs/raw'
import WarningTool from '@editorjs/warning'
import CheckListTool from '@editorjs/checklist'
import ImageTool from '@editorjs/image'
import Underline from '@editorjs/underline'
import Embed from '@editorjs/embed'
import InlineCodeTool from '@editorjs/inline-code'
import EditorJS from '@editorjs/editorjs'
import { joinURL } from 'ufo'

const runtimeConfig = useRuntimeConfig()

const props = defineProps<{
  value?: OutputData
}>()

const editor = ref<EditorJS|undefined>()
const { upload } = useUpload()

const uploadByFile = async (file: File) => {
  const imageData = await upload(file)
  // eslint-disable-next-line prefer-promise-reject-errors
  if (!imageData) { return Promise.reject('Upload failed') }
  return {
    success: 1,
    file: {
      id: imageData[0].id,
      url: joinURL(runtimeConfig.public.apiBackend, imageData[0].path)
    }
  }
}
const uploadByUrl = async (url: string) => {
  return {
    success: 1,
    file: {
      url
    }
  }
}

// binding two ways value by using emit
const emit = defineEmits<{
  (e: 'update:value', data: OutputData): void
}>()

const el = ref<HTMLElement>()

const initEditor = () => {
  editor.value = new EditorJS({
    holder: el.value,
    placeholder: 'Say something...',
    data: props.value,
    tools: {
      header: Header,
      image: {
        class: ImageTool,
        config: {
          uploader: {
            /**
             * Upload file to the server and return an uploaded image data
             * @param {File} file - file selected from the device or pasted by drag-n-drop
             * @return {Promise.<{success, file: {url}}>}
             */
            uploadByFile,
            /**
             * Send URL-string to the server. Backend should load image by this URL and return an uploaded image data
             * @param {string} url - pasted image URL
             * @return {Promise.<{success, file: {url}}>}
             */
            uploadByUrl
          }
        }
      },
      list: List,
      code: CodeTool,
      quote: QuoteTool,
      delimiter: DelimiterTool,
      table: TableTool,
      raw: RawTool,
      warning: WarningTool,
      checklist: CheckListTool,
      underline: Underline,
      embed: Embed,
      inlineCode: InlineCodeTool
    },
    onChange (api: API, event: CustomEvent) {
      console.log('onChange', api, event)
      api.saver.save().then((data) => emit('update:value', data))
    }
  })
}

onMounted(() => nextTick(() => initEditor()))

const setData = (data: OutputData) => {
  try {
    editor.value?.render(data)
  } catch (e) {
    //
  }
}
const destroy = () => {
  try {
    editor.value?.destroy()
  } catch (e) {
    //
  }
}

onUnmounted(() => destroy())

defineExpose({
  setData,
  destroy
})
</script>

<style lang="scss">

.dark {
  .ce-inline-tool-input--showed, .cdx-button, .cdx-input, .ce-block--selected .ce-block__content, .tc-row--selected, .tc-row--selected:after, .tc-cell--selected {
    @apply rounded-md border-0 bg-white/5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6;
  }

  .ce-conversion-toolbar, .ce-popover, .cdx-search-field, .ce-inline-toolbar, .tc-popover {
    @apply border-0 text-white bg-gray-800 shadow-gray-900;
    .ce-conversion-tool, .ce-popover__item,  .ce-inline-tool, .ce-inline-toolbar__dropdown, .tc-popover__item {
      &:hover {
        @apply bg-indigo-600 text-white;
      }
    }
    .ce-conversion-tool__icon, .ce-popover__item-icon, .tc-popover__item-icon {
      @apply text-white bg-gray-800 shadow-gray-900;
    }
  }

  .tc-wrap {
    --color-border: #70757e;
    --color-background: #1c2432;
  }
  .tc-popover {
    --color-border: #70757e;
  }

  .ce-toolbar__settings-btn, .ce-toolbar__plus {
    @apply text-current;
    &:hover {
      @apply bg-indigo-600 text-white;
    }
  }

  // table
  .tc-toolbox__toggler {
    svg {
      @apply text-white;
      rect {
        @apply fill-transparent;
      }
    }

    &:hover {
      svg {
        @apply text-white;
        rect {
          @apply fill-indigo-600;
        }
      }
    }
  }

  .tc-add-column, .tc-add-row {
    &:hover {
      @apply bg-indigo-600 text-white;
      &::before {
        @apply bg-indigo-600;
      }
    }
  }

  .cdx-warning {
    &:before {
      background-image: url("/svg/warning.svg");
    }
  }

  .cdx-checklist__item-checkbox-check {
    background: #1c2432;
    border-color:  #70757e;
    &:before {
      @apply bg-indigo-600;
    }
  }

  .cdx-checklist__item--checked .cdx-checklist__item-checkbox:not(.cdx-checklist__item--checked .cdx-checklist__item-checkbox--no-hover):hover .cdx-checklist__item-checkbox-check {
    @apply bg-indigo-600 hover:bg-indigo-600;
  }
}
.ce-block__content,
.ce-toolbar__content {
    max-width: unset;
}
</style>
