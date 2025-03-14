import vuetify from 'vite-plugin-vuetify';
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',  // Your custom styles
    'vuetify/styles',
    'tailwindcss',
             // Vuetify styles
  ],
  vite: {
    plugins: [
      vuetify(),  // Correct Vuetify integration
      tailwindcss(),
    ]
  },
  modules: [
    '@pinia/nuxt',  // Pinia state management
  ],
  build: {
    transpile: ['vuetify'],
  },
  pages: true, 
});
