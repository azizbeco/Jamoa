// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
    }
  },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  future: {
    compatibilityVersion: 4,
  },
  nitro: {
    // Bundle all node_modules into the output so no separate npm install is needed on the server
    preset: 'node-server',
    externals: {
      traceOptions: {
        base: './'
      }
    }
  }
})
