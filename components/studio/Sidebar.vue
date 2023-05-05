<template>
  <div class="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
      <div class="flex h-16 shrink-0 items-center">
        <nuxt-img class="h-8 w-auto" src="/images/logo.png" alt="Your Company" />
      </div>
      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" class="-mx-2 space-y-1">
              <headless-disclosure
                v-for="item in navigation"
                :key="item.name"
                v-slot="{ open }"
                as="li"
              >
                <headless-disclosure-button as="template">
                  <a
                    href="javascript:void(0)"
                    :class="[item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white']"
                    class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                  >
                    <icon :name="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                    {{ item.name }}

                    <icon
                      v-if="item.children"
                      class="ml-auto h-6 w-6 shrink-0 opacity-40"
                      :class="{
                        'rotate-180': open
                      }"
                      name="material-symbols:keyboard-arrow-down-rounded"
                    />

                  </a>
                </headless-disclosure-button>
                <transition
                  v-if="item.children"
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-out"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <headless-disclosure-panel class="text-gray-500">
                    <ul class="pb-2 pl-5 pt-3 text-sm">
                      <li
                        v-for="(child, index) in item.children"
                        :key="index"
                      >
                        <a href="javascript:void(0)" class="flex items-center gap-x-1 py-2">
                          <icon name="bi:dot" size="20" />
                          {{ child.name }}
                        </a>
                      </li>
                    </ul>
                  </headless-disclosure-panel>
                </transition>
              </headless-disclosure>
            </ul>
          </li>
          <li>
            <div class="text-xs font-semibold leading-6 text-gray-400">
              Your teams
            </div>
            <ul role="list" class="-mx-2 mt-2 space-y-1">
              <li v-for="team in teams" :key="team.name">
                <a href="#" :class="[team.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white', 'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6']">
                  <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">{{ team.initial }}</span>
                  <span class="truncate">{{ team.name }}</span>
                </a>
              </li>
            </ul>
          </li>

          <li class="-mx-6 mt-auto">
            <studio-user />
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StudioNavigation, StudioTeam } from '~/entities/studio.entity'
defineProps<{
  navigation: StudioNavigation[]
  teams: StudioTeam[]
}>()
</script>

<style scoped>

</style>
