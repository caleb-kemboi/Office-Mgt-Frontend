export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore(); // Pinia auth store

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const otpSent = localStorage.getItem('otpSent') === 'true';

  // 🔹 Allow access to `/login` and `/verify-otp` if OTP was sent
  if (to.path === '/auth/verify-otp' && otpSent) {
    return;
  }

  // 🔹 Ensure user is authenticated
  if (!authStore.token) {
    console.warn("🚨 Unauthorized! Redirecting to /login...");
    return navigateTo('/index');
  }

  // 🔹 Role-based access control (RBAC)
  const user = authStore.user;
  const role = user?.role;

  const protectedRoutes = {
    admin: ['/admin', '/manage-users'],
    receptionist: ['/reception', '/deliveries'],
    employee: ['/dashboard', '/my-travels'],
  };

  // 🔹 Check if the route is allowed
  const allowedRoutes = protectedRoutes[role] || [];
  if (!allowedRoutes.some((route) => to.path.startsWith(route))) {
    console.warn("🚨 Access Denied! Redirecting to /unauthorized...");
    return navigateTo('/unauthorized');
  }
});
