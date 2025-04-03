<template>
  <div class="visits-container">

    <div v-if="loading" class="loading">Loading visits...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <table class="visits-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Purpose</th>
            <th>Date</th>
            <th>Time</th>
            <th>Employee</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="visit in visits" :key="visit.id" class="text-black">
            <td>{{ visit.visitor_first_name }} {{ visit.visitor_last_name }}</td>
            <td>{{ visit.visitor_phone }}</td>
            <td>{{ visit.visitor_email }}</td>
            <td>{{ visit.visit_purpose }}</td>
            <td>{{ visit.visit_date }}</td>
            <td>{{ visit.visit_time }}</td>
            <td>{{ visit.employee_email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visits: [],
      loading: true,
      error: null,
    };
  },
  methods: {
    async fetchVisits() {
      try {
        const response = await fetch('http://127.0.0.1:8000/visitors/visit_list/');
        if (!response.ok) {
          throw new Error("Failed to fetch visits");
        }
        const data = await response.json();
        this.visits = data.visits;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchVisits();
  },
};
</script>

<style scoped>
.visits-container {
  max-width: 100%;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.loading, .error {
  text-align: center;
  font-size: 18px;
  color: red;
}

.visits-table {
  width: 100%;
  border-collapse: collapse;
}

.visits-table th, .visits-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.visits-table th {
  background-color: #4B0082;
  color: white;
}

@media (max-width: 768px) {
  .visits-table {
    font-size: 12px;
  }
  .visits-table th, .visits-table td {
    padding: 6px;
  }
}
</style>
