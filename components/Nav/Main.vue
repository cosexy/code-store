<template>
  <div>
    <header class="shadow-default fixed left-0 top-0 z-40 w-full bg-white">
      <nav class="mx-auto flex h-[80px] max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex">
          <NuxtLink to="/" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <NuxtImg class="h-8 w-auto" src="/images/logo.png" alt="" />
          </NuxtLink>
        </div>

        <nav-menu class="ml-12 mr-auto hidden lg:flex lg:gap-x-12" :products="products" :calls-to-action="callsToAction" />

        <nav-cart class="mr-10" />

        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Icon name="heroicons-solid:bars-3" class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <nav-user class="hidden lg:flex" />
      </nav>
      <!-- Mobile menu, show/hide based on mobile menu state. -->
      <nav-mobile-menu v-model:open="mobileMenuOpen" :menu="[...products, ...callsToAction]" />
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

const [mobileMenuOpen] = useToggle(false)
</script>
