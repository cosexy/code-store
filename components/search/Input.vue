<template>
  <div
    class="shadow-default flex w-full overflow-hidden rounded-xl bg-white px-5 transition"
    @submit.prevent
  >
    <div class="flex h-[50px] w-full items-center">
      <Icon
        name="ri:search-line"
        class="shrink-0 text-[24px] text-gray-500"
      />
      <input
        v-model="keyword"
        type="text"
        class="ml-1 h-full w-full border-0 pl-2 text-[18px] font-medium text-gray-600 ring-0 focus:outline-0 focus:ring-0"
        placeholder="Tìm kiếm"
      >
    </div>

    <div
      class="flex h-[50px] w-[230px] shrink-0 items-center border-l border-gray-100 pl-4"
    >
      <select
        v-model="order"
        class="ml-2 h-full w-full border-0 pl-2 text-[14px] font-semibold text-gray-500 ring-0 focus:border-0 focus:outline-0 focus:ring-0"
      >
        <option :value="null">
          Tất Cả
        </option>
        <option :value="'ProjectStatus.PREPARE'">
          On Broad
        </option>
        <option :value="'ProjectStatus.RUNNING'">
          Running
        </option>
        <option :value="'ProjectStatus.DONE'">
          Done
        </option>
        <option :value="'ProjectStatus.STUCK'">
          Stuck
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    value: string
    sort: string
}>()

const emit = defineEmits<{
    (event: 'update:value', value: string): void
    (event: 'update:sort', sort: string): void
}>()

const keyword = useVModel(props, 'value', emit)
const order = useVModel(props, 'sort', emit)
</script>

<style scoped></style>
