<template>
  <div class="travel-listing">
    <h2 class="travel-heading">Employee Travel Directory</h2>
    <div class="controls mb-4">
      <div class="filter-sort flex gap-4">
        <div>
          <label for="destination-filter" class="mr-2 text-black">Filter by Destination:</label>
          <select
            id="destination-filter"
            v-model="selectedDestination"
            class="bg-amber text-white border-black rounded px-2 py-2"
            @change="filterTravels"
          >
            <option class="text-white" value="">All Destinations</option>
            <option class="text-white" v-for="dest in uniqueDestinations" :key="dest" :value="dest">{{ dest }}</option>
          </select>
        </div>
        <button
          @click="sortTravels"
          class="px-3 py-1 bg-purple text-white rounded hover:bg-purple-700"
        >
          Sort by Date {{ sortDirection === 'asc' ? '↓' : '↑' }}
        </button>
      </div>
    </div>
    <ul class="travel-list">
      <li class="travel-item travel-header">
        <span class="travel-info">Employee Name</span>
        <span>Destination</span>
        <span>Travel Date</span>
        <span>Purpose</span>
        <span>Action</span>
      </li>
      <li
        v-for="travel in paginatedTravels"
        :key="travel.id"
        class="travel-item"
      >
        <span class="travel-info">{{ travel.employeeName }}</span>
        <span>{{ travel.destination }}</span>
        <span>{{ travel.travelDate }}</span>
        <span class="travel-info">{{ travel.purpose }}</span>
        <div class="actions">
          <button
            @click="editTravel(travel)"
            class="edit-btn py-2 px-3 rounded bg-blue-600 text-white hover:bg-blue-700 mr-2"
          >
            Edit
          </button>
          <button
            @click="deleteTravel(travel.id)"
            class="delete-btn py-2 px-3 rounded bg-red text-white hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
    <div v-if="paginatedTravels.length === 0" class="text-center py-4 text-black">
      No travel records found.
    </div>
    <div class="pagination mt-4 flex justify-center items-center gap-2">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-3 py-1 bg-black text-white rounded disabled:bg-gray-400 hover:bg-purple-700"
      >
        Previous
      </button>
      <span class="px-3 py-1 bg-green-600 text-white rounded">Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 bg-black text-white rounded disabled:bg-gray-400 hover:bg-purple-700"
      >
        Next
      </button>
    </div>
    <!-- Edit travel component -->
    <edit-travel
      v-if="selectedTravel"
      :travel="selectedTravel"
      @update-travel="updateTravel"
      @close="selectedTravel = null"
    />
  </div>
</template>

<script>
import EditTravel from './EditTravel.vue';

export default {
  components: {
    EditTravel
  },
  props: {
    travels: {
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
      selectedDestination: '',
      sortDirection: 'asc',
      filteredTravels: [],
      selectedTravel: null,
    };
  },
  computed: {
    uniqueDestinations() {
      return [...new Set(this.travels.map(travel => travel.destination))];
    },
    sortedTravels() {
      const sorted = [...this.filteredTravels];
      sorted.sort((a, b) => {
        const dateA = new Date(a.travelDate);
        const dateB = new Date(b.travelDate);
        return this.sortDirection === 'asc'
          ? dateA - dateB
          : dateB - dateA;
      });
      return sorted;
    },
    paginatedTravels() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.sortedTravels.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.sortedTravels.length / this.itemsPerPage);
    },
  },
  watch: {
    travels(newTravels) {
      this.filterTravels();
    },
    selectedDestination() {
      this.currentPage = 1;
    },
  },
  methods: {
    filterTravels() {
      this.filteredTravels = this.selectedDestination
        ? this.travels.filter(travel => travel.destination === this.selectedDestination)
        : [...this.travels];
      this.currentPage = 1;
    },
    sortTravels() {
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
    deleteTravel(id) {
      if (confirm('Are you sure you want to delete this travel record?')) {
        this.$emit('delete-travel', id);
      }
    },
    editTravel(travel) {
      this.selectedTravel = { ...travel };
    },
    updateTravel(updatedTravel) {
      this.$emit('update-travel', updatedTravel);
      this.selectedTravel = null;
      this.filterTravels();
    },
  },
  created() {
    this.filterTravels();
  },
};
</script>

<style scoped>
.travel-listing {
  max-width: 100%;
  font-family: Arial, sans-serif;
}

.travel-heading {
  background-color: #4B0082;
  color: white;
  padding: 15px;
  margin: 0;
  border-radius: 5px 5px 0 0;
}

.travel-list {
  list-style: none;
  padding: 0;
  background-color: #f5f5f5;
  border-radius: 0 0 5px 5px;
}

.travel-item {
  display: grid;
  grid-template-columns: repeat(4, 1fr) 150px;
  gap: 10px;
  padding: 15px;
  border-bottom: 1px solid #ddd;
  align-items: center;
}

.travel-header {
  background-color: #e0e0e0;
  font-weight: bold;
  color: #333;
}

.travel-item:last-child {
  border-bottom: none;
}

.travel-info {
  font-weight: 600;
  color: black;
}

.travel-item span {
  color: #666;
  font-size: 14px;
}

.actions {
  justify-self: end;
  display: flex;
  gap: 8px;
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