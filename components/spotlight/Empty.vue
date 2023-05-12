<template>
  <div
    class="relative flex flex-col items-center px-6 py-14 text-center text-sm sm:px-14"
  >
    <div class="z-10 -my-14 overflow-hidden">
      <vue-lottie-player
        path="https://assets9.lottiefiles.com/packages/lf20_EMTsq1.json"
        loop
        width="300px"
        height="300px"
      />
    </div>

    <p class="relative z-20 mt-2 text-gray-500">
      Nothing here. I am sure you will find something interesting.
    </p>
  </div>
</template>

<script setup lang="ts">

import { VueLottiePlayer } from '@nguyenshort/vue-lottie'
</script>

<style scoped>

</style>
