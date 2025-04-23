import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: null as number | null,
    email: '' as string,
    role: '' as string,
    supervisor: null as number | null,
    isAuthenticated: false,
  }),
  actions: {
    setUser(data: any) {
      this.id = data.id
      this.email = data.email
      this.role = data.role
      this.supervisor = data.supervisor
      this.isAuthenticated = true
    },
    clearUser() {
      this.id = null
      this.email = ''
      this.role = ''
      this.supervisor = null
      this.isAuthenticated = false
    }
  },
  persist: true
})
