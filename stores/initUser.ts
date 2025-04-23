// composables/initUser.ts
import { useUserStore } from '@/stores/user'

export const initUser = async () => {
  const userStore = useUserStore()

  try {
    const { data, error } = await useFetch('/api/fetch_user', {
      credentials: 'include',
    })

    if (error.value || !data.value) {
      userStore.clearUser()
      return null
    }

    userStore.setUser(data.value)
    return data.value
  } catch (e) {
    console.error('Failed to initialize user:', e)
    return null
  }
}
