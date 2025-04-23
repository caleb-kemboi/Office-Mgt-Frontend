<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl transform transition-all duration-300 scale-100">
      <h2 class="text-lg font-semibold text-white bg-purple-900 p-4 text-center rounded-md mb-4">Create Delivery Request</h2>
      <form @submit.prevent="submitDelivery" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex flex-col">
          <label class="text-purple-900 text-sm font-medium mb-1">Item Name</label>
          <input
            v-model="delivery.item_name"
            type="text"
            required
            placeholder="Enter item name"
            class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400"
          >
        </div>
        <div class="flex flex-col">
          <label class="text-purple-900 text-sm font-medium mb-1">Sender Name</label>
          <input
            v-model="delivery.sender_name"
            type="text"
            required
            placeholder="Enter sender's name"
            class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400"
          >
        </div>
        <div class="flex flex-col">
          <label class="text-purple-900 text-sm font-medium mb-1">Employee Email</label>
          <input
            v-model="delivery.employee_email"
            type="email"
            required
            placeholder="Enter employee's email"
            class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400"
          >
        </div>
        <div class="flex flex-col">
          <label class="text-purple-900 text-sm font-medium mb-1">Delivery Description</label>
          <textarea
            v-model="delivery.delivery_description"
            required
            placeholder="Enter delivery description"
            class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400 min-h-[80px] resize-y"
          ></textarea>
        </div>
        <div class="flex flex-col">
          <label class="text-purple-900 text-sm font-medium mb-1">Delivery Date</label>
          <input
            v-model="delivery.delivery_date"
            type="date"
            required
            class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors"
          >
        </div>
        <div class="flex flex-col">
          <label class="text-purple-900 text-sm font-medium mb-1">Delivery Time</label>
          <input
            v-model="delivery.delivery_time"
            type="time"
            required
            class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors"
          >
        </div>
        <div class="col-span-1 md:col-span-2 flex justify-end space-x-4 mt-6">
          <button
            type="button"
            @click="cancelForm"
            class="px-4 py-2 bg-red border-2 border-purple-900 text-white rounded-lg shadow-md hover:bg-red-700 transition-all font-medium focus:outline-none focus:ring-2 focus:ring-purple-900 focus:ring-opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-4 py-2 bg-green border-2 border-purple-900 text-white rounded-lg shadow-md hover:bg-green-700 transition-all font-medium focus:outline-none focus:ring-2 focus:ring-purple-900 focus:ring-opacity-50"
          >
            {{ isSubmitting ? 'Submitting...' : 'Create Delivery' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['create-delivery', 'cancel']);

const delivery = ref({
  item_name: '',
  sender_name: '',
  employee_email: '',
  delivery_description: '',
  delivery_date: '',
  delivery_time: ''
});

const isSubmitting = ref(false);

const submitDelivery = () => {
  isSubmitting.value = true;

  if (!delivery.value.item_name) {
    alert('Item name is required');
    isSubmitting.value = false;
    return;
  }
  if (!delivery.value.sender_name) {
    alert('Sender name is required');
    isSubmitting.value = false;
    return;
  }
  if (!delivery.value.employee_email.includes('@')) {
    alert('Invalid email format');
    isSubmitting.value = false;
    return;
  }
  if (!delivery.value.delivery_description) {
    alert('Delivery description is required');
    isSubmitting.value = false;
    return;
  }
  if (!delivery.value.delivery_date) {
    alert('Delivery date is required');
    isSubmitting.value = false;
    return;
  }
  if (!delivery.value.delivery_time) {
    alert('Delivery time is required');
    isSubmitting.value = false;
    return;
  }

  const deliveryData = {
    item_name: delivery.value.item_name,
    sender_name: delivery.value.sender_name,
    employee_email: delivery.value.employee_email,
    delivery_description: delivery.value.delivery_description,
    delivery_date: delivery.value.delivery_date,
    delivery_time: delivery.value.delivery_time
  };

  emit('create-delivery', deliveryData);
  resetForm();
  isSubmitting.value = false;
};

const cancelForm = () => {
  console.log('Cancel button clicked, emitting cancel event');
  emit('cancel');
};

const resetForm = () => {
  delivery.value = {
    item_name: '',
    sender_name: '',
    employee_email: '',
    delivery_description: '',
    delivery_date: '',
    delivery_time: ''
  };
};
</script>