<template>
  <tr class="text-sm text-gray-400">
    <!-- Avatar -->
    <th scope="col" class="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
      <nuxt-link
        :to="{ name: 'studio-products-id', params: { id: user.id } }"
        class="block h-10 w-10 overflow-hidden rounded-full"
      >
        <nuxt-img
          :src="user.avatar?.path ? user.avatar.path : '/images/avatar.jpg'"
          :provider="user.avatar?.path ? 'backend' : ''"
          class="h-full w-full object-cover transition hover:scale-105"
        />
      </nuxt-link>
    </th>

    <!-- Name -->
    <th scope="col" class="hidden py-4 pl-0 pr-8 font-normal sm:table-cell">
      <nuxt-link :to="{ name: 'studio-products-id', params: { id: user.id } }" class="line-clamp-2 whitespace-pre-line">
        {{ user.name }}
      </nuxt-link>
    </th>

    <!-- Email -->
    <th scope="col" class="hidden py-4 pl-0 pr-8 font-normal md:table-cell lg:pr-20">
      {{ user.email }}
    </th>

    <!-- Price -->
    <th scope="col" class="hidden py-4 pl-0 pr-8 text-center font-normal md:table-cell lg:pr-20">
      <button
        v-if="user.role === User_Role_Enum.User"
        type="button"
        class="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Customer
      </button>

      <button
        v-else-if="user.role === User_Role_Enum.Admin"
        type="button"
        class="rounded bg-orange-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
      >
        Admin
      </button>

      <button
        v-else-if="user.role === User_Role_Enum.SuperAdmin"
        type="button"
        class="rounded bg-rose-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
      >
        Super Amdin
      </button>
    </th>

    <!-- Product -->
    <th scope="col" class="hidden py-4 pl-0 pr-8 text-center font-normal md:table-cell lg:pr-20">
      {{ user.countProduct }}
    </th>

    <!-- Reviews -->
    <th scope="col" class="hidden py-4 pl-0 pr-8 text-center font-normal md:table-cell lg:pr-20">
      {{ user.countReview }}
    </th>

    <th scope="col" class="hidden py-4 pl-0 pr-4 text-right font-normal sm:table-cell sm:pr-6 lg:pr-8">
      <div class="space-x-2">
        <includes-confirm
          message="Are you sure ?"
        >
          <button
            type="button"
            class="rounded bg-rose-500 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
          >
            Remove
          </button>
        </includes-confirm>
        <button
          type="button"
          class="rounded bg-indigo-500 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Edit
        </button>
      </div>
    </th>
  </tr>
</template>

<script setup lang="ts">
import { StudioGetUsersQuery, User_Role_Enum } from '~/apollo/__generated__/graphql'

const props = defineProps<{
    user: StudioGetUsersQuery['studioUsers'][0]
}>()
</script>

<style scoped>

</style>
