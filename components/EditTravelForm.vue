<template>
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-bold mb-4">Edit Travel Request</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label class="block text-gray-700">Travel Title</label>
            <input v-model="form.travel_title" type="text" class="w-full p-2 border rounded" placeholder="Enter travel title" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Travel Purpose</label>
            <textarea v-model="form.travel_purpose" class="w-full p-2 border rounded" placeholder="Enter travel purpose" required></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Employee Email</label>
            <input v-model="form.employee_email" type="email" class="w-full p-2 border rounded" placeholder="Enter employee email" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Applied On</label>
            <input v-model="form.travel_applied_on" type="date" class="w-full p-2 border rounded" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Travel Date From</label>
            <input v-model="form.travel_date_from" type="date" class="w-full p-2 border rounded" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Travel Date To</label>
            <input v-model="form.travel_date_to" type="date" class="w-full p-2 border rounded" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Destination</label>
            <input v-model="form.travel_destination" type="text" class="w-full p-2 border rounded" placeholder="Enter destination" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Mode of Transport</label>
            <select v-model="form.mode_of_transport" class="w-full p-2 border rounded" required>
              <option value="">Select transport</option>
              <option value="flight">Flight</option>
              <option value="train">Train</option>
              <option value="car">Car</option>
              <option value="bus">Bus</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Travel Budget</label>
            <input v-model="form.travel_budget" type="number" step="0.01" class="w-full p-2 border rounded" placeholder="Enter budget" required />
          </div>
          <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>
          <div class="flex justify-end space-x-4">
            <button type="button" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" @click="$emit('cancel')">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  <script setup>
  import { ref, watch } from 'vue';
  
  defineProps({
    travel: { type: Object, required: true }
  });
  
  const emit = defineEmits(['update-travel', 'cancel']);
  
  const form = ref({
    id: '',
    travel_title: '',
    travel_purpose: '',
    employee_email: '',
    travel_applied_on: '',
    travel_date_from: '',
    travel_date_to: '',
    travel_destination: '',
    mode_of_transport: '',
    travel_budget: ''
  });
  
  const error = ref(null);
  
  const initForm = (travel) => {
    form.value = {
      id: travel.id,
      travel_title: travel.travel_title || '',
      travel_purpose: travel.travel_purpose || '',
      employee_email: travel.employee_email || '',
      travel_applied_on: travel.travel_applied_on || '',
      travel_date_from: travel.travel_date_from || '',
      travel_date_to: travel.travel_date_to || '',
      travel_destination: travel.travel_destination || '',
      mode_of_transport: travel.mode_of_transport || '',
      travel_budget: travel.travel_budget ? travel.travel_budget.toString() : ''
    };
  };
  
  watch(() => props.travel, (newTravel) => initForm(newTravel), { immediate: true });
  
  const submitForm = () => {
    error.value = null;
    if (!form.value.travel_title) {
      error.value = 'Travel title is required';
      return;
    }
    if (!form.value.employee_email.includes('@')) {
      error.value = 'Invalid email format';
      return;
    }
    if (!form.value.travel_date_from || !form.value.travel_date_to) {
      error.value = 'Travel dates are required';
      return;
    }
    if (new Date(form.value.travel_date_from) > new Date(form.value.travel_date_to)) {
      error.value = 'Start date must be before end date';
      return;
    }
    if (!form.value.travel_destination) {
      error.value = 'Destination is required';
      return;
    }
    if (!form.value.mode_of_transport) {
      error.value = 'Mode of transport is required';
      return;
    }
    if (!form.value.travel_budget || parseFloat(form.value.travel_budget) <= 0) {
      error.value = 'Valid budget is required';
      return;
    }
  
    const travelData = {
      id: form.value.id,
      travel_title: form.value.travel_title,
      travel_purpose: form.value.travel_purpose,
      employee_email: form.value.employee_email,
      travel_applied_on: form.value.travel_applied_on,
      travel_date_from: form.value.travel_date_from,
      travel_date_to: form.value.travel_date_to,
      travel_destination: form.value.travel_destination,
      mode_of_transport: form.value.mode_of_transport,
      travel_budget: parseFloat(form.value.travel_budget)
    };
  
    emit('update-travel', travelData);
  };
  </script>