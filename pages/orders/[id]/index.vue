<template>
  <div class="bg-white">
    <div class="py-14">
      <orders-view v-if="current === 'view'" :order="order" />
    </div>
  </div>
</template>

<script setup lang="ts" async>
import { SingleExecutionResult } from '@apollo/client'
import { OrderQuery } from '~/apollo/__generated__/graphql'

const { current, goTo } = useStepper(['view', 'asking', 'declined'])

const route = useRoute()
const { result, onResult, onError } = await useAsyncQuery(OrderDocument, {
  filter: {
    id: route.params.id as string
  }
})

const order = ref(result.value!.order)
onResult((result: SingleExecutionResult<OrderQuery>) => {
  if (result.data?.order) {
    order.value = result.data.order
    goTo('view')
  }
})
onError((e) => {
  console.log(e)
  goTo('declined')
})

</script>
