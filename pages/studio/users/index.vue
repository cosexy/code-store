<template>
  <div>
    <includes-teleport to="#page-title">
      <studio-search v-model:keyword="vars.filter.name" />
    </includes-teleport>

    <includes-spinner :spinning="false">
      <table
        class="w-full whitespace-nowrap text-left"
      >
        <colgroup>
          <col class="lg:w-1/12">
          <col class="lg:w-2/12">
          <col class="lg:w-3/12">
          <col class="lg:w-1/12">
          <col class="lg:w-1/12">
        </colgroup>

        <thead class="border-b border-white/10 text-sm leading-6 text-white">
          <tr>
            <!-- Avatar -->
            <th scope="col" class="py-2 pl-4 pr-8 font-semibold sm:table-cell sm:pl-6 lg:pl-8">
              Name
            </th>

            <!-- Name -->
            <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">
              <span class="sr-only">Avatar</span>
            </th>

            <!-- Version -->
            <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">
              Email
            </th>

            <!-- Price -->
            <th scope="col" class="hidden py-2 pl-0 pr-8 text-center font-semibold md:table-cell lg:pr-20">
              Role
            </th>

            <!-- Sale -->
            <th scope="col" class="hidden py-2 pl-0 pr-8 text-center font-semibold md:table-cell lg:pr-20">
              Products
            </th>

            <th scope="col" class="hidden py-2 pl-0 pr-8 text-center font-semibold md:table-cell lg:pr-20">
              Reviews
            </th>

            <th scope="col" class="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8">
              Actions
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-800">
          <studio-users-item
            v-for="user in items"
            :key="user.id"
            :user="user"
          />
        </tbody>
      </table>

      <div class="border-t border-white/10 px-8 py-4">
        <includes-pagination
          :total="count"
          :page-size="filter.limit"
          @change="value => toPage(value.currentPage)"
        />
      </div>
    </includes-spinner>
  </div>
</template>

<script setup lang="ts">
import { GetUsersStudioFilter, StudioCountUsersQueryVariables } from '~/apollo/__generated__/graphql'
const vars = ref<StudioCountUsersQueryVariables>({
  filter: {
    name: ''
  }
})

const { result: countResult } = await useAsyncQuery(StudioCountUsersDocument, vars, {
  debounce: 500
})

const count = computed(() => countResult.value?.studioUsersCount ?? 0)

const filter = ref<GetUsersStudioFilter>({
  name: vars.value.filter.name,
  limit: 7,
  offset: 0,
  sort: 'createdAt'
})

const { result } = useQuery(StudioGetUsersDocument, {
  filter: filter.value
})
const users = computed(() => result.value?.studioUsers ?? [])

const { items, toPage, onLoad } = useAutoPagination(users, count, filter)
</script>
