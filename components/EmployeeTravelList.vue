<template>
  <div class="travel-list">
    <ul class="travel-list-items">
      <li class="travel-header">
        <span class="travel-info">Travel Title</span>
        <span>Purpose</span>
        <span>Employee Email</span>
        <span>Destination</span>
        <span>Travel Dates</span>
      </li>
      <li
        v-for="travel in travels"
        :key="travel.id"
        class="travel-item"
      >
        <span class="travel-info">{{ travel.travel_title }}</span>
        <span>{{ travel.travel_purpose }}</span>
        <span>{{ travel.employee_email }}</span>
        <span>{{ travel.travel_destination }}</span>
        <span>{{ travel.travel_date_from }} - {{ travel.travel_date_to }}</span>
      </li>
    </ul>
    <div v-if="loading" class="text-center py-4 text-gray-600">
      Loading travels...
    </div>
    <div v-else-if="travels.length === 0" class="text-center py-4 text-gray-600">
      No travel records found.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      travels: [],
      loading: false,
      BASE_URL: 'http://127.0.0.1:8000' // Adjust as needed
    };
  },
  methods: {
    async fetchTravels() {
      this.loading = true;
      try {
        const response = await fetch(`${this.BASE_URL}/employee_travels/travels/`);
        const data = await response.json();
        this.travels = data.travels.map(travel => ({
          id: travel.id,
          travel_title: travel.travel_title,
          travel_purpose: travel.travel_purpose,
          employee_email: travel.employee_email,
          travel_date_from: travel.travel_date_from,
          travel_date_to: travel.travel_date_to,
          travel_destination: travel.travel_destination
        }));
      } catch (error) {
        console.error('Error fetching travels:', error);
      } finally {
        this.loading = false;
      }
    }
  },
  created() {
    this.fetchTravels();
  }
};
</script>

<style scoped>
.travel-list {
  max-width: 100%;
  font-family: Arial, sans-serif;
}

.travel-list-items {
  list-style: none;
  padding: 0;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.travel-item, .travel-header {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
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
</style>
