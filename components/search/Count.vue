<template>
  <span ref="countRef" class="ml-2 text-[16px] opacity-50">0</span>
</template>

<script lang="ts" setup>

const props = defineProps<{
    count: number
}>()

const $anime = useAnime()

const countRef = ref<HTMLElement>()
const runAnime = (oldVal: number, val: number) => {
  $anime({
    targets: countRef.value,
    innerHTML: [oldVal, val],
    round: 1,
    easing: 'easeInOutQuad',
    duration: 500
  })
}

watch(() => props.count, (val, oldVal) => runAnime(oldVal, val))

onMounted(() => {
  nextTick(() => {
    runAnime(0, props.count)
  })
})

</script>

<style scoped></style>
