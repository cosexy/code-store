<template>
  <modal-base name="sync-cart" title="Notify">
    <div>
      Your have items in your cart. Do you want to sync them to your account?
    </div>
    <div class="mt-3 flex justify-end space-x-3 border-t border-gray-100 pt-4">
      <button
        type="button"
        class="inline-flex items-center rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
        @click="closeModal"
      >
        No
      </button>

      <button
        type="button"
        class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        @click="syncCart"
      >
        <icon name="material-symbols:cloud-sync-rounded" class="-ml-0.5 h-5 w-5" aria-hidden="true" />
        Yes
      </button>
    </div>
  </modal-base>
</template>

<script setup lang="ts">
import { SyncCartMutationVariables } from '~/apollo/__generated__/graphql'

const { storage, isReady } = useLocalCart()
const { open, close } = useDialog('sync-cart')

watchOnce(isReady, () => {
  if (storage.value.length) {
    open()
  }
})

const closeModal = () => {
  close()
  storage.value = []
}

const { mutate } = useMutation(SyncCartDocument)

const syncCart = () => {
  const input: SyncCartMutationVariables = {
    input: {
      items: storage.value.map((item) => ({
        product: item.product.id,
        quantity: item.quantity,
        licenseType: item.licenseType
      }))
    }
  }
  mutate(input)
  closeModal()
}
</script>

<style scoped>

</style>
