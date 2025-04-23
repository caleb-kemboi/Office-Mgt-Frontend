<template>
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-bold mb-4 text-white bg-purple-900 p-3 rounded-t-lg">Create Delivery Request</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label class="block text-gray-700">Delivery Title</label>
            <input v-model="form.delivery_title" type="text" class="w-full p-2 border rounded" placeholder="Enter delivery title" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Delivery Purpose</label>
            <textarea v-model="form.delivery_purpose" class="w-full p-2 border rounded" placeholder="Enter delivery purpose" required></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Recipient Email</label>
            <input v-model="form.recipient_email" type="email" class="w-full p-2 border rounded" placeholder="Enter recipient email" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Pickup Date</label>
            <input v-model="form.pickup_date" type="date" class="w-full p-2 border rounded" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Delivery Date</label>
            <input v-model="form.delivery_date" type="date" class="w-full p-2 border rounded" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Destination</label>
            <input v-model="form.delivery_destination" type="text" class="w-full p-2 border rounded" placeholder="Enter destination" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Mode of Transport</label>
            <select v-model="form.mode_of_transport" class="w-full p-2 border rounded" required>
              <option value="">Select transport</option>
              <option value="truck">Truck</option>
              <option value="van">Van</option>
              <option value="drone">Drone</option>
              <option value="courier">Courier</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Delivery Budget</label>
            <input v-model="form.delivery_budget" type="number" step="0.01" class="w-full p-2 border rounded" placeholder="Enter budget" required />
          </div>
          <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>
          <div class="flex justify-end space-x-4">
            <button type="button" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" @click="$emit('cancel')">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Create Delivery</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const emit = defineEmits(['create-delivery', 'cancel']);
  
  const form = ref({
    delivery_title: '',
    delivery_purpose: '',
    recipient_email: '',
    pickup_date: '',
    delivery_date: '',
    delivery_destination: '',
    mode_of_transport: '',
    delivery_budget: ''
  });
  
  const errorMessage = ref(null);
  
  const submitForm = () => {
    errorMessage.value = null;
    if (!form.value.delivery_title) {
      errorMessage.value = 'Delivery title is required';
      return;
    }
    if (!form.value.recipient_email.includes('@')) {
      errorMessage.value = 'Invalid email format';
      return;
    }
    if (!form.value.pickup_date || !form.value.delivery_date) {
      errorMessage.value = 'Pickup and delivery dates are required';
      return;
    }
    if (new Date(form.value.pickup_date) > new Date(form.value.delivery_date)) {
      errorMessage.value = 'Pickup date must be before delivery date';
      return;
    }
    if (!form.value.delivery_destination) {
      errorMessage.value = 'Destination is required';
      return;
    }
    if (!form.value.mode_of_transport) {
      errorMessage.value = 'Mode of transport is required';
      return;
    }
    if (!form.value.delivery_budget || parseFloat(form.value.delivery_budget) <= 0) {
      errorMessage.value = 'Valid budget is required';
      return;
    }
  
    const deliveryData = {
      delivery_title: form.value.delivery_title,
      delivery_purpose: form.value.delivery_purpose,
      recipient_email: form.value.recipient_email,
      pickup_date: form.value.pickup_date,
      delivery_date: form.value.delivery_date,
      delivery_destination: form.value.delivery_destination,
      mode_of_transport: form.value.mode_of_transport,
      delivery_budget: parseFloat(form.value.delivery_budget)
    };
  
    emit('create-delivery', deliveryData);
    form.value = {
      delivery_title: '',
      delivery_purpose: '',
      recipient_email: '',
      pickup_date: '',
      delivery_date: '',
      delivery_destination: '',
      mode_of_transport: '',
      delivery_budget: ''
    };
  };
  </script>