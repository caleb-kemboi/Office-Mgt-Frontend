
<template>
  <section class="bg-gray-50 min-h-screen flex items-center justify-center">
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
    <div class="bg-purple-900 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden"></div>
    <div class="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent rounded-3xl shadow-xl">
      <div class="flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md z-10">
        <div class="self-start hidden lg:flex flex-col text-gray-300">
          <h1 class="my-3 font-semibold text-4xl">Verify OTP</h1>
          <p class="pr-3 text-sm opacity-75">Enter the OTP sent to your email.</p>
        </div>
      </div>
      <div class="flex justify-center self-center z-10">
        <div class="p-12 bg-white mx-auto rounded-3xl w-96">
          <div class="mb-7">
            <h3 class="font-semibold text-2xl text-gray-800">OTP has been sent to your email</h3>
          </div>
          <div class="space-y-6">
            <div class="relative">
              <input v-model="otp" class="text-sm px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-purple-400 text-center text-lg tracking-widest" placeholder="Enter OTP">
            </div>
            <button @click="handleVerifyOTP" class="w-full flex justify-center bg-purple-800 hover:bg-purple-700 text-gray-100 p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500">
              Verify OTP
            </button>
            <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
            <p v-if="successMessage" class="success-text">{{ successMessage }}</p>

            <p class="resend-text">
              Didn't receive the code? 
              <span @click="resendOTP" :class="{ 'disabled': resendLoading }">
                {{ resendLoading ? 'Resending...' : 'Resend' }}
              </span>
            </p>
          </div>
          <div class="mt-7 text-center text-black-300 text-xs">
            <p>© {{ new Date().getFullYear() }} All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const otp = ref('');
const loading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const resendLoading = ref(false); // ✅ Define resendLoading

async function handleVerifyOTP() {
  if (!otp.value.trim()) {
    errorMessage.value = "Please enter the OTP.";
    return;
  }

  loading.value = true;
  errorMessage.value = '';

  try {
    // 🔹 Ensure we have the email (from store or localStorage)
    const email = authStore.user?.email || localStorage.getItem("userEmail");

    if (!email) {
      console.error("❌ Email is missing for OTP verification.");
      errorMessage.value = "Email is required for verification.";
      loading.value = false;
      return;
    }

    console.log("🔹 Sending OTP verification request:", { email, otp: otp.value });

    const success = await authStore.verifyOTP({ 
      email: email.toLowerCase(), 
      otp: otp.value 
    });

    if (success) {
      console.log("✅ OTP Verified. Redirecting...");
      router.push('/dashboard');
    } else {
      errorMessage.value = "Invalid OTP. Please try again.";
    }
  } catch (error) {
    console.error("OTP Verification Error:", error);
    errorMessage.value = "An error occurred. Please try again.";
  } finally {
    loading.value = false;
  }
}

async function resendOTP() {
  if (resendLoading.value) return; // Prevent multiple requests
  resendLoading.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const result = await authStore.resendOTP();

    if (result.success) {
      successMessage.value = result.message;
    } else {
      errorMessage.value = result.message;
    }
  } catch (error) {
    console.error("❌ Resend OTP Error:", error);
    errorMessage.value = "An error occurred while resending OTP.";
  } finally {
    resendLoading.value = false;
  }
}


</script>