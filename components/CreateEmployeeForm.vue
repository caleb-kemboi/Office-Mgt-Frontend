<template>
  <div class="p-6 shadow-lg rounded-lg border-2 border-purple-900 relative">
    <h3 class="text-lg font-semibold text-black mb-4">Enter Employee Details</h3>
    <!-- Red X icon for cancel -->
    <button 
      @click="$emit('cancel')"
      class="absolute top-2 right-2 text-red-600 hover:text-red-800 transition-colors focus:outline-none"
      aria-label="Cancel"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    
    <form @submit.prevent="submitForm" class="flex flex-wrap gap-4">
      <!-- Text Fields -->
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">First Name</label>
        <input
          type="text"
          v-model="form.first_name"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-black text-white outline-none transition-colors placeholder-gray-400"
          placeholder="Enter first name"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Last Name</label>
        <input
          type="text"
          v-model="form.last_name"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-black text-white outline-none transition-colors placeholder-gray-400"
          placeholder="Enter last name"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          v-model="form.email"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-black text-white outline-none transition-colors placeholder-gray-400"
          placeholder="Enter email"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          v-model="form.password"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-black text-white outline-none transition-colors placeholder-gray-400"
          placeholder="Enter password"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Role</label>
        <select
          v-model="form.role"
          class="w-full border-b-2 border-yellow-400 focus:border-yellow-600 px-3 py-2 bg-black text-white outline-none transition-colors appearance-none cursor-pointer"
        >
          <option value="employee">Employee</option>
          <option value="receptionist">Receptionist</option>
          <option value="supervisor">Supervisor</option>
        </select>
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Supervisor Email</label>
        <input
          type="email"
          v-model="form.supervisor"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-black text-white outline-none transition-colors placeholder-gray-400"
          placeholder="Enter supervisor email"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Phone Number</label>
        <input
          type="tel"
          v-model="form.phone_number"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-black text-white outline-none transition-colors placeholder-gray-400"
          placeholder="Enter phone number"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Date of Birth</label>
        <input
          type="date"
          v-model="form.date_of_birth"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-black text-white outline-none transition-colors"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Zip Code</label>
        <input
          type="text"
          v-model="form.zip"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-black text-white outline-none transition-colors placeholder-gray-400"
          placeholder="Enter zip code"
        >
      </div>

      <!-- Buttons -->
      <div class="w-full flex justify-end mt-6">
        <button
          type="submit"
          class="px-4 py-2 bg-black text-white border-2 border-purple-900 rounded-lg shadow-md hover:bg-gray-800 transition-all font-medium focus:outline-none focus:ring-2 focus:ring-purple-900 focus:ring-opacity-50"
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
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        role: "employee",
        supervisor: "",
        phone_number: "",
        date_of_birth: "",
        zip: ""
      }
    };
  },
  methods: {
    submitForm() {
      console.log("Employee Created:", this.form);
      alert("Employee Created Successfully!");
      this.$emit("cancel");
    }
  }
};
</script>

<style scoped>
/* No additional CSS needed since all styles are inline with Tailwind classes */
</style>