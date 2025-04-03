<template>
  <div class="px-8 py-12 shadow-lg rounded-lg relative"> 
    <h3 class="text-lg top left-2 font-semibold text-grey mb-4">Enter Employee Details</h3>
    <!-- Red X icon for cancel -->
    <button 
      @click="$emit('cancel')"
      class="absolute top-2 right-2 bg-red hover:bg-black transition-colors focus:outline-none"
      aria-label="Cancel"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    
    <form @submit.prevent="submitForm" class="flex flex-wrap gap-4">
      <!-- First Name -->
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">First Name</label>
        <input
          type="text"
          v-model="form.first_name"
          class="w-full border-b-2 border-green focus:border-purple-700 px-3 py-2 bg-amber text-black outline-none transition-colors placeholder-black"
          placeholder="Enter first name"
        />
      </div>

      <!-- Last Name -->
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Last Name</label>
        <input
          type="text"
          v-model="form.last_name"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-amber text-black outline-none transition-colors placeholder-black"
          placeholder="Enter last name"
        />
      </div>

      <!-- Email -->
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          v-model="form.email"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-amber text-black outline-none transition-colors placeholder-black"
          placeholder="Enter email"
        />
      </div>

      <!-- Password -->
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          v-model="form.password"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-amber text-black outline-none transition-colors placeholder-black"
          placeholder="Enter password"
        />
      </div>

      <!-- Role -->
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Role</label>
        <select
          v-model="form.role"
          class="w-full border-b-2 border-yellow-400 focus:border-yellow-600 px-3 py-2 bg-amber text-black outline-none transition-colors appearance-none cursor-pointer"
        >
          <option value="">-- Select Employee Role --</option>
          <option value="employee">Employee</option>
          <option value="receptionist">Receptionist</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <!-- Supervisor Dropdown -->
      <div class="flex-1 min-w-[200px]">
        <label class="block text-purple-900 text-sm font-medium mb-1">Supervisor</label>
        <select
          v-model="form.supervisor"
          class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-amber text-black outline-none transition-colors appearance-none cursor-pointer"
        >
          <option value="">-- Select Supervisor --</option>
          <option 
            v-for="employee in employees" 
            :key="employee.id" 
            :value="employee.id"
          >
            {{ employee.first_name }} {{ employee.last_name }} ({{ employee.role }})
          </option>
        </select>
      </div>

      <!-- Submit Button -->
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
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        role: "",
        supervisor: ""
      },
      employees: []
    };
  },
  mounted() {
    this.fetchEmployees();
  },
  methods: {
    // Fetch all employees (Admins, Receptionists, Supervisors) for the Supervisor dropdown
    async fetchEmployees() {
      try {
        const response = await $fetch('http://127.0.0.1:8000/user_mgt/employees/');
        this.employees = response.employees;
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    },
    // Submit form to create a new employee
    async submitForm() {
  try {
    // Ensure all required fields are filled
    if (!this.form.email || !this.form.password || !this.form.first_name || !this.form.last_name || !this.form.role) {
      alert("Please fill in all required fields.");
      return;
    }

    // Prepare request payload
    const payload = {
      username: this.form.email,  // Django usually expects "username" for authentication
      password: this.form.password,
      first_name: this.form.first_name,
      last_name: this.form.last_name,
      role: this.form.role,
      supervisor_id: this.form.supervisor || null  // Null if no supervisor selected
    };

    console.log("Submitting payload:", payload);

    // API request
    const response = await $fetch('http://127.0.0.1:8000/user_mgt/create_user/', {
      method: 'POST',
      body: payload,
      headers: {
        "Content-Type": "application/json"  // Ensure JSON format
      }
    });

    console.log('Server response:', response);
    alert('Employee created successfully!');
  } catch (error) {
    console.error('Error creating employee:', error);
    alert('Error creating employee. Please check your input.');
  }
}

  }
};
</script>

<style scoped>
/* No additional CSS needed since all styles are inline with Tailwind classes */
</style>
