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
            <th>Checked Out</th>
            <th>Actions</th> <!-- Actions column -->
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
            <td>{{ visit.employee_name }}</td>
            <td>{{ visit.visitor_checked_out }}</td>
            <td>
              <button @click="editVisit(visit)" class="action-button edit">Edit</button>
              <button v-if="visit.visitor_checked_out === 'No'" @click="updateVisit(visit)" class="action-button update">Check Out</button>
              <button @click="deleteVisit(visit)" class="action-button delete">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination Controls -->
      <div v-if="pagination" class="pagination">
        <button 
          @click="loadVisits(pagination.previous)" 
          :disabled="!pagination.previous">
          Previous
        </button>
        <span class="text-purple">Page {{ pagination.currentPage }} of {{ pagination.totalPages }}</span>
        <button 
          @click="loadVisits(pagination.next)" 
          :disabled="!pagination.next">
          Next
        </button>
      </div>
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
      pagination: {
        next: null,
        previous: null,
        currentPage: 1,
        totalPages: 1,
      },
    };
  },
  methods: {
    async fetchVisits(pageUrl = 'http://127.0.0.1:8000/visitors/visit_list/') {
      try {
        this.loading = true;
        const response = await fetch(pageUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch visits");
        }
        const data = await response.json();
        this.visits = data.visits;
        this.pagination.next = data.pagination.next;
        this.pagination.previous = data.pagination.previous;
        this.pagination.currentPage = data.pagination.currentPage;
        this.pagination.totalPages = data.pagination.totalPages;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    loadVisits(url) {
      this.fetchVisits(url);
    },

    editVisit(visit) {
      console.log("Edit Visit", visit);
    },
    updateVisit(visit) {
      console.log("Update Visit", visit);
    },
    deleteVisit(visit) {
      console.log("Delete Visit", visit);
    }
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

.action-button {
  padding: 5px 10px;
  margin-right: 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  border: none;
}

.update {
  background-color: #4CAF50;
  color: white;
}

.edit {
  background-color: #FFA500;
  color: white;
}

.delete {
  background-color: #f44336;
  color: white;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  padding: 10px;
  background-color: #4B0082;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin: 0 10px;
}

.pagination button:disabled {
  background-color: #555;
  cursor: not-allowed;
}

.pagination span {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  margin: 0 10px;
}
</style>
