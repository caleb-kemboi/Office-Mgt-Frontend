<template>
  <div class="px-8 py-12 shadow-lg rounded-lg relative"> 
    <h3 class="text-lg font-semibold text-grey mb-4">Enter Travel Details</h3>
    <!-- Red X icon for cancel -->
    <button 
      @click="$emit('cancel')"
      class="absolute top-2 right-2 bg-red hover:bg-black transition-colors focus:outline-none text-white"
      aria-label="Cancel"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    
    <form @submit.prevent="submitForm" class="flex flex-wrap gap-4">
      <!-- Text Fields -->
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Travel Title</label>
        <input
          type="text"
          v-model="form.travel_title"
          required
          class="w-full border-b-2 border-green focus:border-purple-700 px-3 py-2 bg-amber text-black outline-none transition-colors placeholder-black"
          placeholder="Enter travel title"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Travel Purpose</label>
        <input
          type="text"
          v-model="form.travel_purpose"
          required
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-amber text-black outline-none transition-colors placeholder-black"
          placeholder="Enter travel purpose"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Employee Email</label>
        <input
          type="email"
          v-model="form.employee_email"
          required
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-amber text-black outline-none transition-colors placeholder-black"
          placeholder="Enter employee email"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Travel Applied On</label>
        <input
          type="date"
          v-model="form.travel_applied_on"
          required
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-amber text-black outline-none transition-colors"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Travel Date From</label>
        <input
          type="date"
          v-model="form.travel_date_from"
          required
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-amber text-black outline-none transition-colors"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Travel Date To</label>
        <input
          type="date"
          v-model="form.travel_date_to"
          required
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-amber text-black outline-none transition-colors"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Travel Destination</label>
        <input
          type="text"
          v-model="form.travel_destination"
          required
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-amber text-black outline-none transition-colors placeholder-black"
          placeholder="Enter travel destination"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Mode of Transport</label>
        <select
          v-model="form.mode_of_transport"
          required
          class="w-full border-b-2 border-yellow-400 focus:border-yellow-600 px-3 py-2 bg-amber text-black outline-none transition-colors appearance-none cursor-pointer"
        >
          <option value="">-- Select Mode of Transport --</option>
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
          step="0.01"
          required
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-amber text-black outline-none transition-colors placeholder-black"
          placeholder="Enter travel budget"
        >
      </div>

      <!-- Buttons -->
      <div class="w-full flex justify-end mt-6">
        <button
          type="submit"
          class="px-4 py-2 bg-green text-white border-2 border-purple-900 rounded-lg shadow-md hover:bg-gray-800 transition-all font-medium focus:outline-none focus:ring-2 focus:ring-purple-900 focus:ring-opacity-50"
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
        travel_title: '',
        travel_purpose: '',
        employee_email: '',
        travel_applied_on: '',
        travel_date_from: '',
        travel_date_to: '',
        travel_destination: '',
        mode_of_transport: '',
        travel_budget: ''
      }
    };
  },
  methods: {
    submitForm() {
      const travelData = {
        travel_title: this.form.travel_title,
        travel_purpose: this.form.travel_purpose,
        employee_email: this.form.employee_email,
        travel_applied_on: this.form.travel_applied_on,
        travel_date_from: this.form.travel_date_from,
        travel_date_to: this.form.travel_date_to,
        travel_destination: this.form.travel_destination,
        mode_of_transport: this.form.mode_of_transport,
        travel_budget: this.form.travel_budget ? parseFloat(this.form.travel_budget) : 0
      };
      this.$emit('travel-added', travelData);
      // Reset form after submission
      this.form = {
        travel_title: '',
        travel_purpose: '',
        employee_email: '',
        travel_applied_on: '',
        travel_date_from: '',
        travel_date_to: '',
        travel_destination: '',
        mode_of_transport: '',
        travel_budget: ''
      };
    }
  }
};
</script>

<style scoped>
/* No additional CSS needed since all styles are inline with Tailwind classes */
</style>