<script setup>
import { useFetch } from 'nuxt/app';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const { data: deliveries, pending, error } = useFetch('/api/employee/deliveries', {
  headers: { Authorization: `Bearer ${authStore.token}` }
});
</script>

<template>
  <div class="delivery-list">
    <h2>My Deliveries</h2>

    <div v-if="pending">Loading...</div>
    <div v-if="error">Error loading deliveries: {{ error.message }}</div>

    <ul v-if="deliveries">
      <li v-for="delivery in deliveries" :key="delivery.id">
        <strong>Package: {{ delivery.package_name }}</strong> - Status: {{ delivery.status }}
      </li>
    </ul>

    <div v-if="deliveries?.length === 0">No deliveries found.</div>
  </div>
</template>

<style scoped>
.delivery-list {
  padding: 10px;
  background: #f9f9f9;
  border-radius: 5px;
}

h2 {
  color: #2c3e50;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background: #ffffff;
  margin: 5px 0;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
