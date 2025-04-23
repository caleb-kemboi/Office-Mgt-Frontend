import vuetify from 'vite-plugin-vuetify';
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',  // Tailwind import here
    'vuetify/styles',
  ],
  vite: {
    plugins: [
      vuetify(),
      tailwindcss(),  // Tailwind Vite plugin
    ],
  },
  modules: [
    '@pinia/nuxt',
  
  ],
  build: {
    transpile: ['vuetify'],
  },
  pages: true,
});