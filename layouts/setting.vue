<template>
  <div class="h-full bg-gray-900">
    <studio-sidebar-mobile v-model:open="open" :navigation="navigation" :teams="teams" />

    <!-- Static sidebar for desktop -->
    <studio-sidebar :teams="teams" :navigation="navigation" />

    <div class="xl:pl-72">
      <!-- Sticky search header -->
      <studio-sticky-search v-model:open="open" />

      <main>
        <nuxt-page />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StudioNavigation, StudioTeam } from '~/entities/studio.entity'

const [open] = useToggle(false)

const navigation = computed<StudioNavigation[]>(() => [
  { name: 'Purchased', to: '#', icon: 'carbon:purchase', current: false },
  { name: 'Licenses', to: '#', icon: 'ic:round-vpn-key', current: false },
  { name: 'Plans', to: '#', icon: 'carbon:chart-bubble-packed', current: false },
  { name: 'API Key', to: '#', icon: 'ant-design:api-outlined', current: false },
  { name: 'Settings', to: '#', icon: 'material-symbols:fingerprint', current: true }
])

const teams = computed<StudioTeam[]>(() => [
  { name: 'Comico', to: '#', initial: 'C', current: false },
  { name: 'Protocol', to: '#', initial: 'P', current: false },
  { name: 'Koen Labs', to: '#', initial: 'K', current: false }
])
</script>
