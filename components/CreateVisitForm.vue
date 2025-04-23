<template>
  <div class="p-6 shadow-lg rounded-lg border-2 border-purple-900">
    <h3 class="text-lg font-semibold text-purple-900 mb-4">Create Visit</h3>
    <form @submit.prevent="submitForm" class="flex flex-wrap gap-4">
      <!-- Text Fields -->
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Visitor First Name</label>
        <input
          type="text"
          v-model="form.visitor_first_name"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400"
          placeholder="Enter first name"
          required
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Visitor Last Name</label>
        <input
          type="text"
          v-model="form.visitor_last_name"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400"
          placeholder="Enter last name"
          required
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Visitor Phone</label>
        <input
          type="tel"
          v-model="form.visitor_phone"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400"
          placeholder="Enter phone number"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Visitor Email</label>
        <input
          type="email"
          v-model="form.visitor_email"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400"
          placeholder="Enter visitor email"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Visit Purpose</label>
        <input
          type="text"
          v-model="form.visit_purpose"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400"
          placeholder="Enter visit purpose"
          required
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Visit Date</label>
        <input
          type="date"
          v-model="form.visit_date"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors"
          required
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Visit Time</label>
        <input
          type="time"
          v-model="form.visit_time"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors"
          required
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Employee Email</label>
        <input
          type="email"
          v-model="form.employee_email"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400"
          placeholder="Enter employee email"
          required
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
          :disabled="isSubmitting"
          class="px-4 py-2 bg-green-600 border-2 border-[#4c1d95] text-white rounded-lg shadow-md hover:bg-green-700 transition-all font-medium border-double focus:outline-none focus:ring-2 focus:ring-[#4c1d95] focus:ring-opacity-50"
        >
          {{ isSubmitting ? 'Submitting...' : 'Submit' }}
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
        visitor_first_name: "",
        visitor_last_name: "",
        visitor_phone: "",
        visitor_email: "",
        visit_purpose: "",
        visit_date: "",
        visit_time: "",
        employee_email: ""
      },
      isSubmitting: false
    };
  },
  methods: {
    submitForm() {
      if (!this.form.visitor_first_name || !this.form.visitor_last_name || !this.form.visit_purpose || !this.form.visit_date || !this.form.visit_time || !this.form.employee_email) {
        alert('Please fill in all required fields.');
        return;
      }
      this.isSubmitting = true;
      try {
        this.$emit('visit-added', { ...this.form });
        this.form = {
          visitor_first_name: "",
          visitor_last_name: "",
          visitor_phone: "",
          visitor_email: "",
          visit_purpose: "",
          visit_date: "",
          visit_time: "",
          employee_email: ""
        };
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>