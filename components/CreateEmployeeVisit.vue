<template>
  <div class="p-6 shadow-lg rounded-lg border-2 border-purple-900 bg-white max-w-4xl mx-auto">
    <h2 class="text-lg font-semibold text-white bg-purple-900 p-4 text-center rounded-md mb-4">Create Employee Visit</h2>
    
    <form @submit.prevent="submitVisit" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="flex flex-col">
        <label class="text-purple-900 text-sm font-medium mb-1">Visitor First Name</label>
        <input
          v-model="visit.visitor_first_name"
          type="text"
          required
          placeholder="Enter visitor's first name"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400"
        >
      </div>

      <div class="flex flex-col">
        <label class="text-purple-900 text-sm font-medium mb-1">Visitor Last Name</label>
        <input
          v-model="visit.visitor_last_name"
          type="text"
          required
          placeholder="Enter visitor's last name"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400"
        >
      </div>

      <div class="flex flex-col">
        <label class="text-purple-900 text-sm font-medium mb-1">Visitor Phone</label>
        <input
          v-model="visit.visitor_phone"
          type="tel"
          placeholder="Enter visitor's phone number"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400"
        >
      </div>

      <div class="flex flex-col">
        <label class="text-purple-900 text-sm font-medium mb-1">Visitor Email</label>
        <input
          v-model="visit.visitor_email"
          type="email"
          placeholder="Enter visitor's email"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400"
        >
      </div>

      <div class="flex flex-col">
        <label class="text-purple-900 text-sm font-medium mb-1">Visit Purpose</label>
        <textarea
          v-model="visit.visit_purpose"
          required
          placeholder="Enter purpose of visit"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400 min-h-[80px] resize-y"
        ></textarea>
      </div>

      <div class="flex flex-col">
        <label class="text-purple-900 text-sm font-medium mb-1">Visit Date</label>
        <input
          v-model="visit.visit_date"
          type="date"
          required
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors"
        >
      </div>

      <div class="flex flex-col">
        <label class="text-purple-900 text-sm font-medium mb-1">Visit Time</label>
        <input
          v-model="visit.visit_time"
          type="time"
          required
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors"
        >
      </div>

      <div class="flex flex-col">
        <label class="text-purple-900 text-sm font-medium mb-1">Employee Email</label>
        <input
          v-model="visit.employee_email"
          type="email"
          required
          placeholder="Enter employee's email"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400"
        >
      </div>

      <div class="col-span-1 md:col-span-2 flex justify-end space-x-4 mt-6">
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-4 py-2 bg-red border-2 border-purple-900 text-white rounded-lg shadow-md hover:bg-red-700 transition-all font-medium focus:outline-none focus:ring-2 focus:ring-purple-900 focus:ring-opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="isSubmitting"
          class="px-4 py-2 bg-green border-2 border-purple-900 text-white rounded-lg shadow-md hover:bg-green-700 transition-all font-medium focus:outline-none focus:ring-2 focus:ring-purple-900 focus:ring-opacity-50"
        >
          {{ isSubmitting ? 'Submitting...' : 'Create Visit' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visit: {
        visitor_first_name: '',
        visitor_last_name: '',
        visitor_phone: '',
        visitor_email: '',
        visit_purpose: '',
        visit_date: '',
        visit_time: '',
        employee_email: '',
      },
      isSubmitting: false
    };
  },
  methods: {
    submitVisit() {
      if (!this.visit.visitor_first_name || !this.visit.visitor_last_name || !this.visit.visit_purpose || !this.visit.visit_date || !this.visit.visit_time || !this.visit.employee_email) {
        alert('Please fill in all required fields.');
        return;
      }
      this.isSubmitting = true;
      try {
        this.$emit('visit-added', { ...this.visit });
        this.resetForm();
      } finally {
        this.isSubmitting = false;
      }
    },
    resetForm() {
      this.visit = {
        visitor_first_name: '',
        visitor_last_name: '',
        visitor_phone: '',
        visitor_email: '',
        visit_purpose: '',
        visit_date: '',
        visit_time: '',
        employee_email: '',
      };
    }
  }
};
</script>