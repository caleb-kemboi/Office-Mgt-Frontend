<template>
  <section class="bg-gray-50 min-h-screen flex items-center justify-center">
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
    <div class="bg-purple-900 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden"></div>
    <div class="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent rounded-3xl shadow-xl">
      <div class="flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md z-10">
        <div class="self-start hidden lg:flex flex-col text-gray-300">
          <h1 class="my-3 font-semibold text-4xl">Reset Your Password</h1>
          <p class="pr-3 text-sm opacity-75">Follow the steps to reset your password.</p>
        </div>
      </div>
      <div class="flex justify-center self-center z-10">
        <div class="p-12 bg-white mx-auto rounded-3xl w-96">
          <div class="mb-7">
            <h3 class="font-semibold text-2xl text-gray-800">Reset Password</h3>
          </div>

          <!-- Step 1: Enter Email -->
          <div v-if="step === 'email'" class="space-y-6">
            <input v-model="email" class="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400" type="email" placeholder="Enter your email">
            <button @click="handleSendOTP" :disabled="loading" class="w-full flex justify-center bg-purple-800 hover:bg-purple-700 text-gray-100 p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500">
              {{ loading ? 'Sending OTP...' : 'Send OTP' }}
            </button>
          </div>

          <!-- Step 2: Verify OTP -->
          <div v-if="step === 'verify'" class="space-y-6">
            <p class="text-gray-700 text-sm">OTP sent to <strong>{{ email }}</strong></p>
            <input v-model="otp" class="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400" type="text" placeholder="Enter OTP">
            <button @click="handleVerifyOTP" :disabled="loading" class="w-full flex justify-center bg-purple-800 hover:bg-purple-700 text-gray-100 p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500">
              {{ loading ? 'Verifying...' : 'Verify OTP' }}
            </button>
          </div>

          <!-- Step 3: Reset Password -->
          <div v-if="step === 'reset'" class="space-y-6">
            <input v-model="newPassword" class="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400" type="password" placeholder="Enter new password">
            <input v-model="confirmPassword" class="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400" type="password" placeholder="Confirm new password">
            <button @click="handleResetPassword" :disabled="loading" class="w-full flex justify-center bg-purple-800 hover:bg-purple-700 text-gray-100 p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500">
              {{ loading ? 'Resetting...' : 'Reset Password' }}
            </button>
          </div>

          <!-- Error Message -->
          <p v-if="errorMessage" class="text-red-600 text-sm mt-4">{{ errorMessage }}</p>

          <div class="mt-7 text-center text-black-300 text-xs">
            <p>© {{ year }} All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>



<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const step = ref('email'); // Tracks the current step: 'email' → 'verify' → 'reset'
const email = ref('');
const otp = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const loading = ref(false);
const year = new Date().getFullYear(); // Automatically updates the year

// Step 1: Send OTP
const handleSendOTP = async () => {
  if (!email.value) {
    errorMessage.value = '❌ Please enter your email.';
    return;
  }

  loading.value = true;
  errorMessage.value = '';

  const success = await authStore.requestResetOTP(email.value);
  if (success) {
    step.value = 'verify'; // Move to OTP verification step
  } else {
    errorMessage.value = '❌ Failed to send OTP. Try again.';
  }

  loading.value = false;
};

// Step 2: Verify OTP
const handleVerifyOTP = async () => {
  if (!otp.value) {
    errorMessage.value = '❌ Please enter the OTP.';
    return;
  }

  loading.value = true;
  errorMessage.value = '';

  const success = await authStore.verifyResetOTP(otp.value);
  if (success) {
    step.value = 'reset'; // Move to password reset step
  } else {
    errorMessage.value = '❌ Invalid OTP. Try again.';
  }

  loading.value = false;
};

// Step 3: Reset Password
const handleResetPassword = async () => {
  if (!newPassword.value || !confirmPassword.value) {
    errorMessage.value = '❌ Please enter your new password.';
    return;
  }

  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = '❌ Passwords do not match.';
    return;
  }

  loading.value = true;
  errorMessage.value = '';

  const success = await authStore.resetPassword(newPassword.value);
  if (success) {
    router.push('/');
  } else {
    errorMessage.value = '❌ Failed to reset password.';
  }

  loading.value = false;
};
</script>
