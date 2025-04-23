export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  // Allow access to OTP page if OTP was sent
  const otpSent = localStorage.getItem('otpSent') === 'true'
  if (to.path === '/auth/verify-otp' && otpSent) return

  // Redirect to login if not authenticated
  if (!authStore.token) {
    return navigateTo('/')
  }

  const role = authStore.user?.role
  const route = to.path

  const protectedRoutes = {
    admin: ['/admin'],
    employee: ['/employee'],
    receptionist: ['/receptionist', '/deliveries']
  }

  const allowedRoutes = protectedRoutes[role] || []
  const hasAccess = allowedRoutes.some(prefix => route.startsWith(prefix))

  if (!hasAccess) {
    console.warn('Access Denied for role:', role, 'trying to access', route)
    return navigateTo('/unauthorized')
  }
})
