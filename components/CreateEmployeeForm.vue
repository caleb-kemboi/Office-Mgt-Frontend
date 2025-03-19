<template>
  <div class="p-6 shadow-lg rounded-lg border-2 border-purple-900">
    <h3 class="text-lg font-semibold text-purple-900 mb-4">Create Employee</h3>
    <form @submit.prevent="submitForm" class="flex flex-wrap gap-4">
      <!-- Text Fields -->
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">First Name</label>
        <input
          type="text"
          v-model="form.first_name"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400"
          placeholder="Enter first name"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Last Name</label>
        <input
          type="text"
          v-model="form.last_name"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400"
          placeholder="Enter last name"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          v-model="form.email"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400"
          placeholder="Enter email"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          v-model="form.password"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400"
          placeholder="Enter password"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Role</label>
        <select
          v-model="form.role"
          class="w-full border-b-2 border-yellow-400 focus:border-yellow-600 px-3 py-2 bg-transparent text-black outline-none transition-colors appearance-none cursor-pointer"
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
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400"
          placeholder="Enter supervisor email"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Phone Number</label>
        <input
          type="tel"
          v-model="form.phone_number"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400"
          placeholder="Enter phone number"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Date of Birth</label>
        <input
          type="date"
          v-model="form.date_of_birth"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors"
        >
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Zip Code</label>
        <input
          type="text"
          v-model="form.zip"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-transparent text-black outline-none transition-colors placeholder-gray-400"
          placeholder="Enter zip code"
        >
      </div>

      <!-- Buttons -->
      <div class="w-full flex justify-end space-x-4 mt-6">
        
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-4 py-2 bg-[#7f1d1d] border-2 border-[#4c1d95] text-[#ef4444] rounded-lg shadow-md hover:bg-[#6b1a1a] transition-all font-medium border-double focus:outline-none focus:ring-2 focus:ring-[#4c1d95] focus:ring-opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-[#7f1d1d] border-2 border-[#4c1d95] text-[#ef4444] rounded-lg shadow-md hover:bg-[#6b1a1a] transition-all font-medium border-double focus:outline-none focus:ring-2 focus:ring-[#4c1d95] focus:ring-opacity-50"
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