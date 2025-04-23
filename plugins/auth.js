import { useAuthStore, BASE_URL } from '@/stores/auth';

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore();
  const csrfToken = useCookie('csrftoken').value

  const refreshToken = async () => {
    try {
      const { data, error } = await useFetch(`${BASE_URL}/authentication/refresh/`, {
        method: 'POST',
        credentials: 'include',
      });
      if (error.value) throw error.value;
      if (data.value?.access) {
        authStore.setAccessToken(data.value.access);
      }
    } catch (err) {
      console.error('Failed to refresh token:', err);
      authStore.logout();
    }
  };

  nuxtApp.hook('vue:error', (error) => {
    console.error('Vue Error:', error);
  });

  nuxtApp.hook('app:mounted', () => {
    setInterval(refreshToken, 4 * 60 * 1000);
  });
});
