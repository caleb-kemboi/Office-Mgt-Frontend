import { defineStore } from 'pinia';

export const BASE_URL = 'http://127.0.0.1:8000';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: null,
    otpSent: false,
  }),

  actions: {
    async requestOTP(credentials) {
      try {
        const response = await fetch(`${BASE_URL}/authentication/login/`,{
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error('Failed to send OTP');
        }

        const data = await response.json();
        console.log("🔹 Server Response Data:", data);
   // ✅ Manually set otpSent to true since server does not return it
       this.otpSent = true;  
       console.log("🔹 Updated otpSent:", this.otpSent);

         // 🔹 Store the user's email for verification later
      this.user = { email: credentials.email };
      localStorage.setItem("userEmail", credentials.email);

    return data;
      } catch (error) {
        console.error('OTP request failed:', error);
        this.otpSent = false;
        throw error;
      }
    },

    async resendOTP() {
      try {
        const email = this.user?.email || localStorage.getItem("userEmail");
    
        if (!email) {
          console.error("❌ Resend OTP Failed: Email not found");
          return { success: false, message: "Email not found. Please log in again." };
        }
    
        console.log("📨 Resending OTP to:", email);
    
        const response = await fetch(`${BASE_URL}/authentication/resend_otp/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
    
        if (!response.ok) {
          throw new Error("Failed to resend OTP");
        }
    
        const data = await response.json();
        console.log("✅ OTP Resent Successfully:", data);
    
        return { success: true, message: data.message || "OTP resent successfully." };
      } catch (error) {
        console.error("❌ Resend OTP Error:", error);
        return { success: false, message: "Failed to resend OTP. Please try again." };
      }
    },
    
    
    async verifyOTP(credentials) {
      try {
        console.log("🔹 Sending OTP verification request:", credentials);
    
        const { data, error } = await useFetch(`${BASE_URL}/authentication/verify_login_otp/`, {
          method: 'POST',
          body: credentials, 
          credentials: 'include',
        });
    
        console.log("🔹 Server Response:", data.value);
    
        if (error.value) {
          console.error('❌ OTP verification failed (useFetch error):', error.value);
          return false;
        }
    
        if (!data.value) {
          console.error('❌ No response from server.');
          return false;
        }
    
        if (data.value?.message?.includes('OTP verified')) {
          this.user = data.value.user || { email: credentials.email };
          localStorage.setItem('user', JSON.stringify(this.user));  
          return true;
        } else {
          console.error('❌ OTP verification response error:', data.value);
          return false;
        }
      } catch (err) {
        console.error('❌ OTP verification error (Exception):', err);
        return false;
      }
    },
      // reset otp
      async requestResetOTP(email) {
        try {
          const response = await fetch(`${BASE_URL}/authentication/forgot_password/`, {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: { 'Content-Type': 'application/json' }
          });
  
          if (!response.ok) throw new Error('Failed to send reset OTP');
  
          this.resetEmail = email;
          return true;
        } catch (error) {
          console.error('Reset OTP request failed:', error);
          return false;
        }
      },
      
      async verifyResetOTP(otp) {
        try {
          const response = await fetch(`${BASE_URL}/authentication/verify_reset_otp/`, {
            method: 'POST',
            body: JSON.stringify({ email: this.resetEmail, otp }),
            headers: { 'Content-Type': 'application/json' }
          });
  
          if (!response.ok) throw new Error('Invalid OTP');
  
          return true;
        } catch (error) {
          console.error('Reset OTP verification failed:', error);
          return false;
        }
      },
      
      async resetPassword(newPassword) {

        try {
        console.log('Reset Email:', this.resetEmail); // Debugging
        if (!this.resetEmail) throw new Error('Email is missing');
          const response = await fetch(`${BASE_URL}/authentication/reset_password/`, {
            method: 'POST',
            body: JSON.stringify({ email: this.resetEmail, new_password: newPassword }),
            headers: { 'Content-Type': 'application/json' }
          });
  
          if (!response.ok) throw new Error('Failed to reset password');
  
          this.resetEmail = '';
          return true;
        } catch (error) {
          console.error('Password reset failed:', error);
          return false;
        }
      },
  
    async fetchUser() {
      try {
        const { data, error } = await useFetch(`${BASE_URL}/authentication/user/`, {
          method: 'GET',
          credentials: 'include',
        });

        if (error.value) {
          console.error('Fetch user error:', error.value);
          return;
        }

        this.user = data.value || { email: "unknown" };
      } catch (err) {
        console.error('Fetch user error:', err);
      }
    },

    async logout() {
      try {
        await useFetch(`${BASE_URL}/authentication/logout/`, {
          method: 'POST',
          credentials: 'include',
        });
      } catch (error) {
        console.error('Error during logout:', error);
      } finally {
        this.user = null;
        this.accessToken = null;
        this.otpSent = false;
      }
    }
  },
});
