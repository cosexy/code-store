<template>
  <div>
    <div class="mx-auto max-w-7xl sm:px-2 lg:px-8">
      <div class="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
        <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Thank you for your order!
        </h1>
        <p class="mt-2 text-sm text-gray-500">
          Check the status of recent orders, manage returns, and discover similar products.
        </p>
      </div>
    </div>

    <div class="mt-16">
      <h2 class="sr-only">
        Recent orders
      </h2>
      <div class="mx-auto max-w-7xl sm:px-2 lg:px-8">
        <div class="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
          <div class="border-y border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
            <h3 class="sr-only">
              Order placed on
              <includes-time-tag :timestamp="order.createdAt">
                <template #default="{ date }">
                  {{ date.format('LLL') }}
                </template>
              </includes-time-tag>
            </h3>

            <div class="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
              <dl class="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                <div>
                  <dt class="font-medium text-gray-900">
                    Date placed
                  </dt>
                  <dd class="mt-1 text-gray-500">
                    <includes-time-tag :timestamp="order.createdAt">
                      <template #default="{ date }">
                        {{ date.format('DD/MM/YYYY') }}
                      </template>
                    </includes-time-tag>
                  </dd>
                </div>
                <div>
                  <dt class="font-medium text-gray-900">
                    Total amount
                  </dt>
                  <dd class="mt-1 font-medium text-gray-900">
                    ${{ final }}
                  </dd>
                </div>
              </dl>

              <headless-menu as="div" class="relative flex justify-end lg:hidden">
                <div class="flex items-center">
                  <headless-menu-button class="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500">
                    <span class="sr-only">Options for order {{ order.id }}</span>
                    <icon name="ion:ellipsis-vertical" class="h-6 w-6" aria-hidden="true" />
                  </headless-menu-button>
                </div>

                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <headless-menu-items
                    class="absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div class="py-1">
                      <headless-menu-item v-slot="{ active }">
                        <a :href="order.id" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">View</a>
                      </headless-menu-item>
                      <headless-menu-item v-slot="{ active }">
                        <a :href="order.createdAt" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Invoice</a>
                      </headless-menu-item>
                    </div>
                  </headless-menu-items>
                </transition>
              </headless-menu>

              <div class="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                <a href="#" class="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span>View Order</span>
                  <span class="sr-only">{{ order.id }}</span>
                </a>
                <a href="#" class="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span>View Invoice</span>
                  <span class="sr-only">for order {{ order.id }}</span>
                </a>
              </div>
            </div>

            <!-- Products -->
            <h4 class="sr-only">
              Items
            </h4>
            <ul role="list" class="divide-y divide-gray-200">
              <orders-item v-for="product in merchandise" :key="product.id" :item="product" :created-at="order.createdAt" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" async>
import { OrderItemFragment, OrderMerchandiseFragment } from '~/apollo/__generated__/graphql'

const props = defineProps<{
  order: OrderItemFragment
}>()

const order = computed(() => props.order)
const merchandise = computed<OrderMerchandiseFragment[]>(() => order.value?.merchandise as OrderMerchandiseFragment[])

// cart
const cart = computed(() => merchandise.value.map((item) => ({
  ...item,
  product: {
    ...item.product,
    price: item.price,
    sale: item.sale
  }
})))

const { final } = useCart(cart as any)
</script>
