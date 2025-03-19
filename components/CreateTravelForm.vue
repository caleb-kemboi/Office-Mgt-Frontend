<template>
  <div class="p-6 shadow-lg rounded-lg border-2 border-purple-900">
    <h3 class="text-lg font-semibold text-purple-900 mb-4">Create Employee Travel</h3>
    <form @submit.prevent="submitForm" class="flex flex-wrap gap-4">
      <!-- Text Fields -->
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Travel Title</label>
        <input
          type="text"
          v-model="form.travel_title"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400"
          placeholder="Enter travel title"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Travel Purpose</label>
        <input
          type="text"
          v-model="form.travel_purpose"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400"
          placeholder="Enter travel purpose"
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
        <label class="block text-purple-900 text-sm font-medium mb-1">Applied On</label>
        <input
          type="date"
          v-model="form.travel_applied_on"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Travel Date From</label>
        <input
          type="date"
          v-model="form.travel_date_from"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Travel Date To</label>
        <input
          type="date"
          v-model="form.travel_date_to"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Destination</label>
        <input
          type="text"
          v-model="form.travel_destination"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400"
          placeholder="Enter destination"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Mode of Transport</label>
        <select
          v-model="form.mode_of_transport"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors appearance-none cursor-pointer"
        >
          <option value="flight">Flight</option>
          <option value="train">Train</option>
          <option value="car">Car</option>
          <option value="bus">Bus</option>
        </select>
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Travel Budget</label>
        <input
          type="number"
          v-model="form.travel_budget"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400"
          placeholder="Enter budget (e.g., 500)"
          step="1"
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
        travel_title: "",
        travel_purpose: "",
        employee_email: "",
        travel_applied_on: "",
        travel_date_from: "",
        travel_date_to: "",
        travel_destination: "",
        mode_of_transport: "flight", // Default value
        travel_budget: ""
      }
    };
  },
  methods: {
    submitForm() {
      console.log("Travel Created:", this.form);
      alert("Travel Created Successfully!");
      this.$emit("cancel");
    }
  }
};
</script>