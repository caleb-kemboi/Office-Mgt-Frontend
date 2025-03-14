<script setup>
import { useFetch } from 'nuxt/app';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const { data: visits, pending, error } = useFetch('/api/employee/visits', {
  headers: { Authorization: `Bearer ${authStore.token}` }
});
</script>

<template>
  <div class="visit-list">
    <h2>My Visits</h2>

    <div v-if="pending">Loading...</div>
    <div v-if="error">Error loading visits: {{ error.message }}</div>

    <ul v-if="visits">
      <li v-for="visit in visits" :key="visit.id">
        <strong>Visitor: {{ visit.visitor_name }}</strong> - Status: {{ visit.status }}
      </li>
    </ul>

    <div v-if="visits?.length === 0">No visits found.</div>
  </div>
</template>

<style scoped>
.visit-list {
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
