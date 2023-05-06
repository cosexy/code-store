<template>
  <li class="p-4 sm:p-6">
    <div class="flex items-center sm:items-start">
      <div class="shadow-default h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-32 sm:w-48">
        <nuxt-img :src="item.product.avatar.path" :alt="item.product.name" provider="backend" class="h-full w-full object-cover object-center" />
      </div>
      <div class="ml-6 flex-1">
        <div class="font-medium text-gray-900 sm:flex sm:justify-between">
          <h5 class="text-lg font-semibold">
            {{ item.product.name }}
          </h5>
          <p class="mt-2 sm:mt-0">
            ${{ item.sale }}
          </p>
        </div>

        <div>
          <span
            class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
            :class="[item.lisence.type === Lisence_Type.Regular ? 'bg-indigo-100 text-indigo-600' : 'bg-rose-100 text-rose-600']"
          >
            {{ item.lisence.type === Lisence_Type.Extended ? 'Extended' : 'Standard' }}
          </span>
        </div>

        <div class="hidden text-sm sm:mt-2 sm:block">
          <p class="line-clamp-3 text-gray-500">
            {{ item.product.description }}
          </p>
        </div>
      </div>
    </div>

    <div class="mt-6 sm:flex sm:justify-between">
      <div class="flex items-center">
        <icon name="material-symbols:check-circle-outline" class="h-5 w-5 text-green-500" aria-hidden="true" />
        <p class="ml-2 text-sm font-medium text-gray-500">
          Expiration day:
          <time :datetime="expirationDate.toISOString()">
            {{ expirationDate.format('MMMM DD, YYYY') }}
          </time>
        </p>
      </div>

      <div class="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0">
        <div class="flex flex-1 justify-center">
          <a
            href="#"
            class="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
          >
            Download
          </a>
        </div>
        <div class="flex flex-1 justify-center pl-4">
          <a
            href="javascript:void(0)"
            class="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
          >
            Copy lisence
          </a>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { Lisence_Type, OrderMerchandiseFragment } from '~/apollo/__generated__/graphql'

const props = defineProps<{
  item: OrderMerchandiseFragment
  createdAt: number
}>()

const dayjs = useDayjs()
// expiration day = createdAt + a year
const expirationDate = computed(() => dayjs(props.createdAt).add(1, 'year'))
</script>

<style scoped>

</style>
