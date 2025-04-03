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
        </tr>
      </thead>
      <tbody>
        <tr v-for="delivery in deliveries" :key="delivery.id">
          <td>{{ delivery.item_name }}</td>
          <td>{{ delivery.sender_name }}</td>
          <td>{{ delivery.employee_email }}</td>
          <td>{{ delivery.delivery_description }}</td>
          <td>{{ delivery.delivery_date }}</td>
          <td>{{ delivery.delivery_time }}</td>
          <td>{{ delivery.status }}</td>
        </tr>
      </tbody>
    </table>
    
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    
    <div v-if="pagination" class="pagination">
      <button @click="$emit('loadDeliveries', pagination.previous)" :disabled="!pagination.previous">
        Previous
      </button>
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
  color:#1e1e1e;
}

.section-heading {
  font-size: 24px;
  color: #4B0082;
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  font-size: 18px;
  color: #fff;
}

.deliveries-table {
  width: 100%;
  border-collapse: collapse;
}

.deliveries-table th, .deliveries-table td {
  padding: 10px;
  border: 1px solid #444;
  text-align: left;
}

.deliveries-table th {
  background-color: #4B0082;
  color: white;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 20px;
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
</style>
