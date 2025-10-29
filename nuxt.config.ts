// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@nuxt/ui', '@nuxt/fonts'],
  css: ['@/assets/css/main.css'],
  app: {
    head: {
      link: [{
        rel: 'icon',
        href: '/logo.svg'
      }]
    }
  },
  runtimeConfig: {
    tursoDatabaseUrl: '',
    tursoAuthToken: '',
    googleClientId: '',
    googleClientSecret: '',
    githubClientId: '',
    geminiApi: '',
    githubClientSecret: '',
    public: {
      appEnv: ''
    }
  }
})