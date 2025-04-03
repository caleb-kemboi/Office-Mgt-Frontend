<template>
  <div class="p-6 shadow-lg rounded-lg border-2 border-purple-900">
    <h3 class="text-lg font-semibold text-purple-900 mb-4">Create Delivery</h3>
    <form @submit.prevent="submitForm" class="flex flex-wrap gap-4">
      <!-- Text Fields -->
      <div class="flex-1 min-w-[200px]">
        <label class="block text-black text-sm font-medium mb-1">Item Name</label>
        <input
          type="text"
          v-model="form.item_name"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400"
          placeholder="Enter item name"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Sender Name</label>
        <input
          type="text"
          v-model="form.sender_name"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400"
          placeholder="Enter sender name"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Employee Email</label>
        <input
          type="email"
          v-model="form.employee_email"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400"
          placeholder="Enter employee email"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Delivery Description</label>
        <input
          type="text"
          v-model="form.delivery_description"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400"
          placeholder="Enter delivery description"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Delivery Date</label>
        <input
          type="date"
          v-model="form.delivery_date"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Delivery Time</label>
        <input
          type="time"
          v-model="form.delivery_time"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors"
        >
      </div>

      <!-- Buttons -->
      <div class="w-full flex justify-end space-x-4 mt-6">
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-4 py-2 bg-red-600 border-2 border-[#4c1d95] text-white rounded-lg shadow-md hover:bg-red-700 transition-all font-medium border-double focus:outline-none focus:ring-2 focus:ring-[#4c1d95] focus:ring-opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-green-600 border-2 border-[#4c1d95] text-white rounded-lg shadow-md hover:bg-green-700 transition-all font-medium border-double focus:outline-none focus:ring-2 focus:ring-[#4c1d95] focus:ring-opacity-50"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        item_name: "",
        sender_name: "",
        employee_email: "",
        delivery_description: "",
        delivery_date: "",
        delivery_time: ""
      }
    };
  },
  methods: {
    submitForm() {
      console.log("Delivery Created:", this.form);
      alert("Delivery Created Successfully!");
      this.$emit("cancel");
    }
  }
};
</script>