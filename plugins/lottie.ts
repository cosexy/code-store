// @ts-ignore
import { VueLottiePlayer } from '@nguyenshort/vue-lottie'
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('VueLottiePlayer', VueLottiePlayer)
})
