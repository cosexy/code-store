<template>
  <div>
    <header class="shadow-default fixed left-0 top-0 z-50 w-full bg-white">
      <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="">
          </a>
        </div>
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Icon name="heroicons-solid:bars-3" class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <headless-popover-group class="hidden lg:flex lg:gap-x-12">
          <headless-popover class="relative">
            <headless-popover-button class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 focus:outline-0">
              Product
              <Icon name="heroicons-solid:chevron-down" class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </headless-popover-button>

            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <headless-popover-panel class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div class="p-4">
                  <div v-for="item in products" :key="item.name" class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                    <div class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <Icon :name="item.icon" class="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                    </div>
                    <div class="flex-auto">
                      <a :href="item.href" class="block font-semibold text-gray-900">
                        {{ item.name }}
                        <span class="absolute inset-0" />
                      </a>
                      <p class="mt-1 text-gray-600">
                        {{ item.description }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  <a v-for="item in callsToAction" :key="item.name" :href="item.href" class="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
                    <Icon class="h-5 w-5 flex-none text-gray-400" :name="item.icon" />
                    {{ item.name }}
                  </a>
                </div>
              </headless-popover-panel>
            </Transition>
          </headless-popover>

          <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Features</a>
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Marketplace</a>
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Company</a>
        </headless-popover-group>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></a>
        </div>
      </nav>
      <headless-dialog as="div" class="lg:hidden" :open="mobileMenuOpen" @close="mobileMenuOpen = false">
        <div class="fixed inset-0 z-10" />
        <headless-dialog-panel class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="">
            </a>
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
              <span class="sr-only">Close menu</span>
              <Icon name="heroicons-solid:x-mark" class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <headless-disclosure v-slot="{ open }" as="div" class="-mx-3">
                  <headless-disclosure-button class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-50">
                    Product
                    <Icon name="heroicons-solid:chevron-down" :class="[open ? 'rotate-180' : '', 'h-5 w-5 flex-none']" aria-hidden="true" />
                  </headless-disclosure-button>
                  <headless-disclosure-panel class="mt-2 space-y-2">
                    <headless-disclosure-button v-for="item in [...products, ...callsToAction]" :key="item.name" as="a" :href="item.href" class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      {{ item.name }}
                    </headless-disclosure-button>
                  </headless-disclosure-panel>
                </headless-disclosure>
                <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Features</a>
                <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Marketplace</a>
                <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Company</a>
              </div>
              <div class="py-6">
                <a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</a>
              </div>
            </div>
          </div>
        </headless-dialog-panel>
      </headless-dialog>
    </header>

    <div style="height: 80px" />
  </div>
</template>

<script setup>
const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: 'heroicons-solid:chart-pie' },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: 'heroicons-solid:cursor-arrow-rays' },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: 'heroicons-solid:finger-print' },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: 'heroicons-solid:squares-plus' },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: 'heroicons-solid:arrow-path' }
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: 'ic:outline-play-circle' },
  { name: 'Contact sales', href: '#', icon: 'material-symbols:call' }
]

const mobileMenuOpen = ref(false)
</script>
