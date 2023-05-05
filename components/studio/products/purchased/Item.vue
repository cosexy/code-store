<template>
  <tr>
    <td class="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
      <div class="flex items-center gap-x-4">
        <div class="relative h-24 w-52">
          <nuxt-img
            v-for="(avatar, index) in avatars"
            :key="index"
            :src="avatar"
            alt=""
            class="absolute h-24 w-36 origin-right overflow-hidden rounded-md"
            :style="{
              transform: `translateX(${index * 15}px) scale(${100 - index * 15}%)`,
              zIndex: avatars.length - index
            }"
            provider="backend"
          />
        </div>
      </div>
    </td>
    <td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
      <div class="flex gap-x-3">
        <div class="rounded-md bg-gray-700/40 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-white/10">
          Download
        </div>
      </div>
    </td>
    <td class="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
      <div class="flex items-center justify-end gap-x-2 sm:justify-start">
        <includes-time-tag
          v-slot="{ date }"
          class="text-gray-400 sm:hidden"
          :datetime="expertionDay"
        >
          {{ date.format('YYYY-MM-DD') }}
        </includes-time-tag>
        <div :class="[statuses.Completed, 'flex-none rounded-full p-1']">
          <div class="h-1.5 w-1.5 rounded-full bg-current" />
        </div>
        <div class="hidden text-white sm:block">
          {{ expertionDay.format('YYYY-MM-DD') }}
        </div>
      </div>
    </td>
    <td class="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
      ${{ final }}
    </td>
    <td class="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
      <includes-time-tag
        v-slot="{ date }"
        :datetime="item.createdAt"
      >
        {{ date.format('YYYY-MM-DD HH:mm') }}
      </includes-time-tag>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { OrderItemFragment } from '~/apollo/__generated__/graphql'
const statuses = { Completed: 'text-green-400 bg-green-400/10', Error: 'text-rose-400 bg-rose-400/10' }

const props = defineProps<{
  item: OrderItemFragment
}>()

const cart = computed(() => (props.item.merchandise || []).map((item) => ({
  ...item,
  product: {
    ...item.product,
    price: item.price,
    sale: item.sale
  }
})))
const avatars = computed(() => (props.item.merchandise || []).slice(0, 3).map((item) => item.product.avatar.path))

const { final } = useCart(cart)

const dayjs = useDayjs()
// plus a year from createdAt
const expertionDay = computed(() => dayjs(props.item.createdAt).add(1, 'year'))
</script>

<style scoped>

</style>
