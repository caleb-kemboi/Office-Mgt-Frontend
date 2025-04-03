<template>
  <div class="delivery-list">
    <div v-if="loading" class="loading">Loading deliveries...</div>

    <table v-else class="deliveries-table">
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Sender Name</th>
          <th>Employee Email</th>
          <th>Delivery Description</th>
          <th>Delivery Date</th>
          <th>Delivery Time</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="delivery in deliveries" :key="delivery.id">
          <td>{{ delivery.item_name }}</td>
          <td>{{ delivery.sender_name }}</td>
          <td>{{ delivery.employee_name }}</td>
          <td>{{ delivery.delivery_description }}</td>
          <td>{{ delivery.delivery_date }}</td>
          <td>{{ delivery.delivery_time }}</td>
          <td>{{ delivery.status }}</td>
          <td class="action-buttons">
            <!-- Conditionally show Update button if status is "Pending" -->
            <button 
              v-if="delivery.status === 'Pending'" 
              @click="updateDelivery(delivery)"
              class="action-button update">
              Update Status
            </button>
            
            <button 
              @click="editDelivery(delivery)"
              class="action-button edit">
              Edit
            </button>
            
            <button 
              @click="deleteDelivery(delivery)"
              class="action-button delete">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    
    <!-- Pagination at the bottom -->
    <div v-if="pagination" class="pagination">
      <button @click="$emit('loadDeliveries', pagination.previous)" :disabled="!pagination.previous">
        Previous
      </button>
      
      <!-- Current Page Display -->
      <span class="current-page">Page {{ currentPage }} of {{ totalPages }}</span>
      
      <button @click="$emit('loadDeliveries', pagination.next)" :disabled="!pagination.next">
        Next
      </button>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    deliveries: {
      type: Array,
      required: true
    },
    pagination: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      required: true
    },
    errorMessage: {
      type: String,
      default: null
    }
  },
  computed: {
    currentPage() {
      return this.pagination.currentPage || 1; // Assuming `currentPage` is part of the pagination object
    },
    totalPages() {
      return this.pagination.totalPages || 1; // Assuming `totalPages` is part of the pagination object
    }
  },
  methods: {
    // Placeholder methods for Edit, Update, and Delete
    editDelivery(delivery) {
      console.log("Edit Delivery", delivery);
      // Logic for editing a delivery
    },
    updateDelivery(delivery) {
      console.log("Update Delivery", delivery);
      // Logic for updating a delivery
    },
    deleteDelivery(delivery) {
      console.log("Delete Delivery", delivery);
      // Logic for deleting a delivery
    }
  }
};
</script>

<style scoped>
.delivery-list {
  margin: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  color: #1e1e1e;
  overflow-x: auto;
}

.deliveries-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed; /* Ensures table does not overflow horizontally */
}

.deliveries-table th, .deliveries-table td {
  padding: 8px;
  border: 1px solid #444;
  text-align: center;
  word-wrap: break-word;
  overflow: hidden; /* Prevent content from overflowing */
  text-overflow: ellipsis; /* Truncate text with ellipsis if it exceeds */
}

.deliveries-table th {
  background-color: #4B0082;
  color: white;
}

.deliveries-table td {
  text-align: center;
}

.loading, .error-message {
  text-align: center;
  font-size: 18px;
  color: red;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
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

.current-page {
  font-size: 16px;
  margin: 0 10px;
  color: #4B0082;
}

/* Action buttons styling */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 5px; /* Add gap between buttons */
  flex-wrap: wrap; /* Wrap buttons if there's no space */
}

.action-button {
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  white-space: nowrap; /* Prevent text from wrapping */
  max-width: 120px; /* Limit button width */
  overflow: hidden; /* Prevent text from overflowing */
  text-overflow: ellipsis; /* Truncate text with ellipsis if it overflows */
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

@media (max-width: 768px) {
  /* Adjust table and pagination on smaller screens */
  .deliveries-table th, .deliveries-table td {
    padding: 6px;
    font-size: 12px;
  }

  .pagination button {
    padding: 8px;
    font-size: 14px;
  }

  .current-page {
    font-size: 14px;
  }

  .action-buttons {
    flex-direction: column; /* Stack buttons vertically on smaller screens */
  }

  .action-button {
    width: 100%; /* Ensure buttons take full width on smaller screens */
    margin-bottom: 5px; /* Space out stacked buttons */
  }
}
</style>
