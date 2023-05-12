<template>
  <headless-transition-root
    :show="modal.actived"
    as="div"
    appear
  >
    <headless-dialog
      class="relative z-40"
      @close="close()"
    >
      <headless-transition-child
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25 transition-opacity" />
      </headless-transition-child>

      <div class="fixed inset-0 z-40 overflow-y-auto p-4 sm:p-6 md:p-20">
        <headless-transition-child
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <headless-dialog-panel
            class="mx-auto max-w-3xl divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-black/5 transition-all"
          >
            <headless-combobox
              v-slot="{ activeOption }"
            >
              <!-- Search Input -->
              <div class="relative">
                <icon
                  name="ph:magnifying-glass-bold"
                  class="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <headless-combobox-input
                  class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  @change="keyword = $event.target.value"
                  @keydown.enter="toSearch(keyword as string)"
                />
              </div>
              <spotlight-search v-if="keyword" :active-option="activeOption" :keyword="keyword" />

              <spotlight-waiting v-else />
            </headless-combobox>
          </headless-dialog-panel>
        </headless-transition-child>
      </div>
    </headless-dialog>
  </headless-transition-root>
</template>

<script setup lang="ts">
const { modal, close } = useDialog('spotlight')

const keyword = ref('')

const router = useRouter()
const toSearch = (_keyword: string) => {
  if (_keyword) {
    close()
    router.push({
      path: '/search',
      query: { keyword: _keyword }
    })

    setTimeout(() => {
      keyword.value = ''
    }, 1000)
  }
}
</script>
