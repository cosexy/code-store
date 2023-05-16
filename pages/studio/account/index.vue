<template>
  <div>
    <studio-tabs :tabs="tabs">
      <headless-tab-panel>
        <studio-account-info :form="form as UserInformationFragment" />
      </headless-tab-panel>

      <headless-tab-panel>
        <studio-account-password />
        <studio-account-sessions />
      </headless-tab-panel>
    </studio-tabs>

    <includes-teleport to="#page-title">
      <h2 class="text-lg font-medium text-gray-200">
        My Account
      </h2>
    </includes-teleport>
  </div>
</template>

<script setup lang="ts">
import { UserInformationFragment, UserInformationFragmentDoc } from '~/apollo/__generated__/graphql'

const tabs = computed(() => ['Account', 'Security'])

const form = ref<UserInformationFragment>()

const authStore = useAuth()

const route = useRoute()

if (route.name === 'studio-account-id') {
  const { result } = await useAsyncQuery(StudioUserDocument, {
    filter: {
      id: route.params.id as string
    }
  })
  if (result.value?.studioUser) {
    form.value = useFragment(UserInformationFragmentDoc, result.value?.studioUser)
  }
} else {
  form.value = useFragment(UserInformationFragmentDoc, authStore.user)!
}
</script>

<style scoped>

</style>
