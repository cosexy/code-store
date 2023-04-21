// https://nuxt.com/docs/api/configuration/nuxt-config
import GraphqlGenerator from './vite/plugins/vite-graphql-generator'
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
    'nuxt-headlessui'
  ],
  // @ts-ignore
  googleFonts: {
    families: {
      Caveat: true,
      Sacramento: true,
      'Nunito+Sans': [400, 500, 600, 700, 800]
    }
  },
  // @ts-ignore
  runtimeConfig: {
    // Private config that is only available on the server
    apiSecret: process.env.NUXT_API_SECRET,
    // Config within public will be also exposed to the client
    public: {
      apiBase: '/api',
      apiGraphQL: process.env.NUXT_PUBLIC_APOLLO_ENDPOIT,
      apiBackend: process.env.NUXT_PUBLIC_BACKEND_ENDPOIT
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    plugins: [GraphqlGenerator()]
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
    dirs: ['stores']
  },
  hooks: {}
})
