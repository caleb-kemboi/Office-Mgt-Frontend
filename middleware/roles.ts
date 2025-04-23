import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  // We assume that our store uses "accessToken" but it may be null in our dev flow.
  // Instead of checking token, we only verify that a user exists.
  const auth = useAuthStore() as { user?: { role?: string } }

  // If user is missing, redirect to login.
  if (!auth?.user) {
    console.warn('[Auth] Missing user, redirecting to login')
    return navigateTo('/')
  }

  const userRole = auth.user.role || ''
  const allowedRoles = to.meta.roles as string[] | undefined

  // If allowedRoles is defined for the route, verify that the user’s role is included.
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    console.warn(`[Auth] Role "${userRole}" not allowed here. Redirecting to /unauthorized`)
    return navigateTo('/unauthorized')
  }
})
