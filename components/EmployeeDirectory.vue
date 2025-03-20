<template>
  <div class="employee-listing">
    <h2 class="employee-heading">Employee Directory</h2>
    <div class="controls mb-4">
      <div class="filter-sort flex gap-4">
        <div>
          <label for="role-filter" class="mr-2 text-gray-700">Filter by Role:</label>
          <select
            id="role-filter"
            v-model="selectedRole"
            class="border rounded px-2 py-1"
            @change="filterEmployees"
          >
            <option value="">All Roles</option>
            <option v-for="role in uniqueRoles" :key="role" :value="role">{{ role }}</option>
          </select>
        </div>
        <button
          @click="sortEmployees"
          class="px-3 py-1 bg-purple-900 text-white rounded hover:bg-purple-700"
        >
          Sort by Name {{ sortDirection === 'asc' ? '↓' : '↑' }}
        </button>
      </div>
    </div>
    <ul class="employee-list">
      <li
        v-for="employee in paginatedEmployees"
        :key="employee.id"
        class="employee-item"
      >
        <span class="employee-name">{{ employee.name }}</span>
        <span>{{ employee.email }}</span>
        <span>{{ employee.phone }}</span>
        <span>{{ employee.role }}</span>
        <button
          @click="deleteEmployee(employee.id)"
          class="delete-btn text-red-600 hover:text-red-800"
        >
          Delete
        </button>
      </li>
    </ul>
    <div v-if="paginatedEmployees.length === 0" class="text-center py-4 text-gray-600">
      No employees found.
    </div>
    <div class="pagination mt-4 flex justify-center items-center gap-2">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-3 py-1 bg-purple-900 text-white rounded disabled:bg-gray-400 hover:bg-purple-700"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 bg-purple-900 text-white rounded disabled:bg-gray-400 hover:bg-purple-700"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    employees: {
      type: Array,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      currentPage: 1,
      selectedRole: '',
      sortDirection: 'asc',
      filteredEmployees: [],
    };
  },
  computed: {
    uniqueRoles() {
      return [...new Set(this.employees.map(emp => emp.role))];
    },
    sortedEmployees() {
      const sorted = [...this.filteredEmployees];
      sorted.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return this.sortDirection === 'asc'
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });
      return sorted;
    },
    paginatedEmployees() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.sortedEmployees.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.sortedEmployees.length / this.itemsPerPage);
    },
  },
  watch: {
    employees(newEmployees) {
      this.filterEmployees();
    },
    selectedRole() {
      this.currentPage = 1; // Reset to first page when filter changes
    },
  },
  methods: {
    filterEmployees() {
      this.filteredEmployees = this.selectedRole
        ? this.employees.filter(emp => emp.role === this.selectedRole)
        : [...this.employees];
      this.currentPage = 1; // Reset to first page when filtering
    },
    sortEmployees() {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    deleteEmployee(id) {
      if (confirm('Are you sure you want to delete this employee?')) {
        this.$emit('delete-employee', id);
      }
    },
  },
  created() {
    this.filterEmployees(); // Initialize filteredEmployees
  },
};
</script>

<style scoped>
.employee-listing {
  max-width: 100%;
  font-family: Arial, sans-serif;
}

.employee-heading {
  background-color: #4B0082; /* Dark purple */
  color: white;
  padding: 15px;
  margin: 0;
  border-radius: 5px 5px 0 0;
}

.employee-list {
  list-style: none;
  padding: 0;
  background-color: #f5f5f5;
  border-radius: 0 0 5px 5px;
}

.employee-item {
  display: grid;
  grid-template-columns: repeat(4, 1fr) 100px;
  gap: 10px;
  padding: 15px;
  border-bottom: 1px solid #ddd;
  align-items: center;
}

.employee-item:last-child {
  border-bottom: none;
}

.employee-name {
  font-weight: 600;
  color: #333;
}

.employee-item span {
  color: #666;
  font-size: 14px;
}

.delete-btn {
  justify-self: end;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.controls {
  padding: 10px;
  background-color: #f5f5f5;
}
</style>