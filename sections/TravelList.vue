<script setup>
import { useFetch } from 'nuxt/app';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const { data: travels, pending, error } = useFetch('/api/employee/travels', {
  headers: { Authorization: `Bearer ${authStore.token}` }
});
</script>

<template>
  <div class="travel-list">
    <h2>My Travel Requests</h2>

    <div v-if="pending">Loading...</div>
    <div v-if="error">Error loading travels: {{ error.message }}</div>

    <ul v-if="travels">
      <li v-for="travel in travels" :key="travel.id">
        <strong>{{ travel.destination }}</strong> - Status: {{ travel.status }}
      </li>
    </ul>

    <div v-if="travels?.length === 0">No travel requests found.</div>
  </div>
</template>

<style scoped>
.travel-list {
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
