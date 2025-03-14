<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>

<template>
  <nav class="navbar">
    <ul>
      <li><NuxtLink to="/dashboard">Dashboard</NuxtLink></li>

      <!-- Show only for Admin -->
      <li v-if="authStore.user?.role === 'admin'">
        <NuxtLink to="/dashboard/admin">Admin Panel</NuxtLink>
      </li>

      <!-- Show only for Receptionist -->
      <li v-if="authStore.user?.role === 'receptionist'">
        <NuxtLink to="/dashboard/reception">Reception</NuxtLink>
      </li>

      <!-- Show only for Employee -->
      <li v-if="authStore.user?.role === 'employee'">
        <NuxtLink to="/dashboard/employee">My Travels</NuxtLink>
      </li>

      <li>
        <button @click="authStore.logout()">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #2c3e50;
  padding: 10px;
}

ul {
  list-style-type: none;
  display: flex;
  gap: 15px;
}

li {
  color: white;
}

a {
  color: white;
  text-decoration: none;
}
</style>
