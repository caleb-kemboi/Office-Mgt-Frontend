import forms from '@tailwindcss/forms';

export default {
  content: [
    "./pages/**/*.{vue,js,ts}", 
    "./components/**/*.{vue,js,ts}", 
    "./layouts/**/*.{vue,js,ts}",
    "./app.vue"
  ],
  theme: {
    extend: {},
  },
  plugins: [forms()],  // Tailwind Forms Plugin
};
