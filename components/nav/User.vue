<template>
  <div>
    <a
      v-if="!authStore.user"
      href="javascript:void(0)"
      class="text-sm font-medium text-gray-700 hover:text-gray-800"
      @click="openAuth()"
    >
      Sign in
    </a>

    <headless-menu
      v-else
      as="div"
      class="relative flex items-center justify-center"
    >
      <headless-menu-button>
        <nuxt-img class="shadow-default h-8 w-8 overflow-hidden rounded-full" src="/images/user.png" alt="" />
      </headless-menu-button>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <headless-menu-items
          class="absolute right-0 mt-24 w-56 overflow-hidden rounded-md bg-slate-900 shadow focus:outline-none"
        >
          <div class="p-1">
            <headless-menu-item v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md p-2 text-sm',
                ]"
              >
                <!--                <EditIcon-->
                <!--                  :active="active"-->
                <!--                  class="mr-2 h-5 w-5 text-violet-400"-->
                <!--                  aria-hidden="true"-->
                <!--                />-->
                Edit
              </button>
            </headless-menu-item>
          </div>
        </headless-menu-items>
      </transition>
    </headless-menu>
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuth()
const { open: openAuth } = useDialog('auth')
</script>

<style scoped></style>
