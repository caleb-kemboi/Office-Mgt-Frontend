import { defineStore } from 'pinia'

export const BASE_URL = 'http://127.0.0.1:8000'

/**
 * @typedef {Object} User
 * @property {string} email
 * @property {string} [role]
 * @property {string} [accessToken]
 */
export const useAuthStore = defineStore('auth', {
  state: () => ({
    /** @type {User|null} */
    user: null,
    /** @type {string|null} */
    accessToken: null,
    /** @type {boolean} */
    otpSent: false,
    /** @type {string} */
    resetEmail: '',
  }),

  actions: {
    async requestOTP(credentials) {
      try {
        const res = await fetch(`${BASE_URL}/authentication/login/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
          credentials: 'include',
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data?.message || 'Failed to send OTP')

        this.otpSent = true
        this.user = { email: credentials.email }
        localStorage.setItem('userEmail', credentials.email)
        return { success: true, data }
      } catch (error) {
        console.error('OTP request failed:', error)
        this.otpSent = false
        return { success: false, message: error.message }
      }
    },

    async resendOTP() {
      try {
        const email = this.user?.email || localStorage.getItem("userEmail")
        if (!email) throw new Error("Email not found. Please login again.")

        const res = await fetch(`${BASE_URL}/authentication/resend_otp/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
          credentials: 'include',
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data?.message || 'Failed to resend OTP')

        return { success: true, message: data.message || "OTP resent successfully." }
      } catch (error) {
        console.error("Resend OTP error:", error)
        return { success: false, message: error.message }
      }
    },

    async verifyOTP({ email, otp }) {
      try {
        const { error } = await useFetch(`${BASE_URL}/authentication/verify_login_otp/`, {
          method: 'POST',
          body: { email, otp },
          credentials: 'include',
        })

        if (error.value) throw new Error(error.value.data?.message || 'OTP verification failed')

        // Fetch user info (including role) after successful OTP verification
        await this.fetchUser()
        return { success: true }
      } catch (err) {
        console.error('OTP verification failed:', err)
        return { success: false, message: err.message }
      }
    },

    async verifyResetOTP(otp) {
      try {
        if (!this.resetEmail) throw new Error('Reset email is missing')

        const res = await fetch(`${BASE_URL}/authentication/verify_reset_otp/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.resetEmail, otp }),
          credentials: 'include',
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data?.message || 'Invalid OTP')

        return { success: true }
      } catch (error) {
        console.error('Reset OTP verification failed:', error)
        return { success: false, message: error.message }
      }
    },

    async resetPassword(newPassword) {
      try {
        if (!this.resetEmail) throw new Error('Email is missing')

        const res = await fetch(`${BASE_URL}/authentication/reset_password/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.resetEmail, new_password: newPassword }),
          credentials: 'include',
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data?.message || 'Failed to reset password')

        this.resetEmail = ''
        return { success: true }
      } catch (error) {
        console.error('Password reset failed:', error)
        return { success: false, message: error.message }
      }
    },

    async fetchUser() {
      try {
        // If the access token cookie is not present, append the email as a query parameter for development:
        const email = localStorage.getItem("userEmail")
        let url = `${BASE_URL}/authentication/user/`
        if (!document.cookie.includes("access_token") && email) {
          url += `?email=${encodeURIComponent(email)}`
        }
        const { data, error } = await useFetch(url, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        })

        if (error.value) throw new Error('Failed to fetch user')
        this.user = data.value
        return { success: true }
      } catch (error) {
        console.error('Fetch user failed:', error)
        return { success: false, message: error.message }
      }
    },

    async logout() {
      try {
        await useFetch(`${BASE_URL}/authentication/logout/`, {
          method: 'POST',
          credentials: 'include',
        })
      } catch (error) {
        console.error('Logout failed:', error)
      } finally {
        this.user = null
        this.accessToken = null
        this.otpSent = false
        localStorage.removeItem("userEmail")
      }
    }
  },

  persist: true
})
