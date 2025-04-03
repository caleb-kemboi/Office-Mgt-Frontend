<template>
  <div class="employee-travels">
    <h2 class="employee-heading">Employee Travels</h2>
    <table v-if="paginatedTravels.length > 0" class="travel-table bg-white">
      <thead>
        <tr>
          <th>Title</th>
          <th>Employee</th>
          <th>Purpose</th>
          <th>From</th>
          <th>To</th>
          <th>Destination</th>
          <th>Transport</th>
          <th>Budget</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="travel in paginatedTravels" :key="travel.id">
         <td> <b>{{ travel.travel_title }}</b></td>
         <td class="p-2">{{ travel.employee__first_name }} {{ travel.employee__last_name }}</td>
          <td>{{ travel.travel_purpose }}</td>
          <td>{{ travel.travel_date_from }}</td>
          <td>{{ travel.travel_date_to }}</td>
          <td>{{ travel.travel_destination }}</td>
          <td>{{ travel.mode_of_transport }}</td>
          <td>{{ travel.travel_budget }}</td>
          <td>{{ travel.travel_approval_status }}</td>
          <td class="p-2 flex gap-2">
          <button
            v-if="travel.travel_approval_status === 'Pending'"
            @click="$emit('approve-travel', travel.id)"
            class="px-2 py-1 bg-green text-white rounded hover:bg-green-600"
          >
            Approve Travel
          </button>

          <button class="action-btn" @click="editTravel(travel.id)">Edit</button>
          <br>
          <br>
          <button class="action-btn delete-btn" @click="deleteTravel(travel.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No travel records available.</p>
    <div class="pagination" v-if="totalPages > 1">
      <button class="pagination-btn" @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button class="pagination-btn" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    travels: {
      type: Array,
      default: () => [],  // Ensures travels is always an array
    },
    itemsPerPage: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.travels.length / this.itemsPerPage) || 1;  // Minimum 1 page
    },
    paginatedTravels() {
      const travels = Array.isArray(this.travels) ? this.travels : [];  // Fallback to empty array
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return travels.slice(start, end);
    },
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    editTravel(id) {
      this.$emit('edit-travel', id);
    },
    deleteTravel(id) {
      this.$emit('delete-travel', id);
    },
  },
};
</script>

<style scoped>
.employee-travels {
  margin: 20px;
  font-family: Arial, sans-serif;
}

.employee-heading {
  background-color: #4B0082;  /* Purple header */
  color: white;
  padding: 15px;
  margin: 0;
  border-radius: 5px 5px 0 0;
}

.travel-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
}

th, td {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  color: #333;
  font-weight: bold;
}

.action-btn {
  padding: 5px 10px;
  margin-right: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.action-btn:hover {
  background-color: #0056b3;
}

.delete-btn {
  background-color: #dc3545;
}

.delete-btn:hover {
  background-color: #b02a37;
}

.pagination {
  margin-top: 15px;
  text-align: center;
}

.pagination-btn {
  padding: 5px 10px;
  margin: 0 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.pagination-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #0056b3;
}

span {
  margin: 0 10px;
  color: #333;
}

p {
  color: #666;
  text-align: center;
  padding: 10px;
}
</style>
