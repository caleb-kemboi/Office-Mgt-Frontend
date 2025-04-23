<template>
  <section class="bg-gray-50 min-h-screen flex items-center justify-center">
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
    <div class="bg-purple-900 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden"></div>
    <div class="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent rounded-3xl shadow-xl">
      <div class="flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md z-10">
        <div class="self-start hidden lg:flex flex-col text-gray-300">
          <h1 class="my-3 font-semibold text-4xl">Welcome Back</h1>
          <p class="pr-3 text-sm opacity-75">Good to see you around!</p>
        </div>
      </div>
      <div class="flex justify-center self-center z-10">
        <div class="p-12 bg-white mx-auto rounded-3xl w-96">
          <div class="mb-7">
            <h3 class="font-semibold text-2xl text-gray-800">Office Sign In</h3>
          </div>
          <div class="space-y-6">
            <input v-model="email" class="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400" type="email" placeholder="Email">
            <div class="relative">
              <input v-model="password" :type="showPassword ? 'text' : 'password'" class="text-sm px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-purple-400" placeholder="Password">
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" @click="togglePassword">
                <svg v-if="showPassword" class="h-5 text-purple-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor">
                  <path d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82a331.25 331.25 0 0 0-36.72 55.59 32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19C518.29 135.59 410.93 64 288 64A308.15 308.15 0 0 0 140.68 101.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45z"/>
                </svg>
                <svg v-else class="h-5 text-purple-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
                  <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144z"/>
                </svg>
              </div>
            </div>
            <div class="text-sm ml-auto">
              <router-link to="/auth/reset-password" class="text-purple-700 hover:text-purple-600">
                Forgot your password?
              </router-link>
            </div>
            <button @click="handleLogin" :disabled="loading" class="w-full flex justify-center bg-purple-800 hover:bg-purple-700 text-gray-100 p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500">
              {{ loading ? 'Processing...' : 'Log In' }}
            </button>
          <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
          </div>
          <div class="mt-7 text-center text-black-300 text-xs">
            <p>© {{ year }} All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'nuxt/app';
import { navigateTo } from '#app';


const authStore = useAuthStore();
const router = useRouter();
const year = new Date().getFullYear()
const email = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref('');
const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// ✅ Debug OTP Sent status
watch(() => authStore.otpSent, (newVal) => {
  console.log("🔄 OTP Status changed:", newVal);
  if (newVal) {
    console.log("✅ Redirecting to /auth/verify-otp...");
    navigateTo('/auth/verify-otp')
      .then(() => console.log("✅ Successfully navigated!"))
      .catch((err) => console.error("❌ Navigation error:", err));
  }
});

async function handleLogin() {
  loading.value = true;
  errorMessage.value = '';

  try {
    await authStore.requestOTP({ email: email.value, password: password.value });
    console.log("🔹 OTP Sent Status (Auth Store):", authStore.otpSent);

    // 🔥 Ensure Vue updates the reactivity
    await nextTick();

    console.log("🚀 Current Auth Store State:", JSON.stringify(authStore));

    // ✅ Fallback manual redirect if watch fails
    if (authStore.otpSent) {
      console.log("✅ Manually redirecting...");
      router.push('/auth/verify-otp')
      .then(() => console.log("✅ Successfully navigated!"))
      .catch((err) => console.error("❌ Navigation error:", err));
    }
  } catch (error) {
    console.error('Login error:', error);
    errorMessage.value = 'Check your entries and try again.';
  } finally {
    loading.value = false;
  }
}
</script>