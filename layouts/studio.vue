<template>
  <div class="dark:selection h-full min-h-screen bg-gray-900">
    <studio-sidebar-mobile v-model:open="open" :navigation="navigation" :teams="teams" />

    <!-- Static sidebar for desktop -->
    <studio-sidebar :teams="teams" :navigation="navigation" />

    <div class="xl:pl-72">
      <!-- Sticky search header -->
      <studio-sticky-header v-model:open="open" />

      <main>
        <nuxt-page />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StudioNavigation, StudioTeam } from '~/entities/studio.entity'

const color = useColorMode()
color.value = 'dark'

const [open] = useToggle(false)

const navigation = computed<StudioNavigation[]>(() => [
  {
    name: 'Products',
    to: '/studio/products',
    icon: 'ic:round-dashboard-customize',
    current: true,
    children: [
      {
        name: 'Purchased',
        to: '/studio/products/purchased',
        icon: 'carbon:purchase',
        current: false
      },
      {
        name: 'On Sale',
        to: '/studio/purchased/plugins',
        icon: 'carbon:purchase',
        current: false
      }
    ]
  },
  {
    name: 'Orders',
    to: '/studio/orders',
    icon: 'ic:round-vpn-key',
    current: false
  },
  {
    name: 'Categories',
    to: '/studio/categories',
    icon: 'carbon:chart-bubble-packed',
    current: false
  },
  {
    name: 'Users',
    to: '/studio/users',
    icon: 'ant-design:api-outlined',
    current: false
  },
  {
    name: 'Settings',
    to: '/studio/account',
    icon: 'material-symbols:fingerprint',
    current: false
  }
])

const teams = computed<StudioTeam[]>(() => [
  { name: 'Comico', to: '#', initial: 'C', current: false },
  { name: 'Protocol', to: '#', initial: 'P', current: false },
  { name: 'Koen Labs', to: '#', initial: 'K', current: false }
])
</script>
