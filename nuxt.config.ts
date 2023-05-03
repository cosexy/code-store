// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    // '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/apollo',
    '@pinia/nuxt',
    '@nuxtjs/device',
    '@nuxtjs/robots',
    '@nuxtjs/google-fonts',
    '@nuxt/image-edge',
    'nuxt-icon',
    'nuxt-purgecss',
    '@vueuse/nuxt',
    'nuxt-headlessui',
    '@formkit/nuxt'
  ],
  googleFonts: {
    families: {
      Caveat: true,
      Sacramento: true,
      'Nunito+Sans': [400, 500, 600, 700, 800]
    }
  },
  runtimeConfig: {
    // Private config that is only available on the server
    apiSecret: process.env.NUXT_API_SECRET,
    // Config within public will be also exposed to the client
    public: {
      apiBase: '/api',
      apiGraphQL: process.env.NUXT_PUBLIC_APOLLO_ENDPOIT,
      apiWsGraphQL: process.env.NUXT_PUBLIC_APOLLO_WS_ENDPOIT,
      apiBackend: process.env.NUXT_PUBLIC_BACKEND_ENDPOIT
    }
  },
  apollo: {
    clients: {
      default: './apollo/clients/default.ts'
    }
  },
  image: {
    providers: {
      backend: {
        name: 'backend',
        provider: '~/providers/backend',
        options: {
          baseURL: process.env.NUXT_PUBLIC_BACKEND_ENDPOIT
        }
      }
    }
  },
  imports: {
    dirs: ['stores', 'apollo/__generated__']
  }
})
