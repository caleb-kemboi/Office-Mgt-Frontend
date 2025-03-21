<template>
  <div class="edit-employee-modal">
    <div class="px-8 py-12 shadow-lg rounded-lg relative bg-white"> 
      <h3 class="text-lg font-semibold text-grey mb-4">Edit Employee Details</h3>
      <!-- Red X icon for cancel -->
      <button 
        @click="$emit('close')"
        class="absolute top-2 right-2 bg-red hover:bg-black transition-colors focus:outline-none text-white"
        aria-label="Cancel"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <form @submit.prevent="saveChanges" class="flex flex-wrap gap-4">
        <!-- Text Fields -->
        <div class="flex-1 min-w-[200px]">
          <label class="block text-purple-900 text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            v-model="form.first_name"
            required
            class="w-full border-b-2 border-green focus:border-purple-700 px-3 py-2 bg-amber text-black outline-none transition-colors placeholder-black"
            placeholder="Enter first name"
          >
        </div>
        <div class="flex-1 min-w-[200px]">
          <label class="block text-purple-900 text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            v-model="form.last_name"
            required
            class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-amber text-black outline-none transition-colors placeholder-black"
            placeholder="Enter last name"
          >
        </div>
        <div class="flex-1 min-w-[200px]">
          <label class="block text-purple-900 text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            v-model="form.email"
            required
            class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-amber text-black outline-none transition-colors placeholder-black"
            placeholder="Enter email"
          >
        </div>
        <div class="flex-1 min-w-[200px]">
          <label class="block text-purple-900 text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            v-model="form.password"
            class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-amber text-black outline-none transition-colors placeholder-black"
            placeholder="Enter new password (optional)"
          >
        </div>
        <div class="flex-1 min-w-[200px]">
          <label class="block text-purple-900 text-sm font-medium mb-1">Role</label>
          <select
            v-model="form.role"
            required
            class="w-full border-b-2 border-yellow-400 focus:border-yellow-600 px-3 py-2 bg-amber text-black outline-none transition-colors appearance-none cursor-pointer"
          >
            <option value="--Select Role--">-- Select Employee Role --</option>
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
            class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-amber text-black outline-none transition-colors placeholder-black"
            placeholder="Enter supervisor email"
          >
        </div>
        <div class="flex-1 min-w-[200px]">
          <label class="block text-purple-900 text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            v-model="form.phone_number"
            required
            class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-amber text-black outline-none transition-colors placeholder-black"
            placeholder="Enter phone number"
          >
        </div>
        <div class="flex-1 min-w-[200px]">
          <label class="block text-purple-900 text-sm font-medium mb-1">Date of Birth</label>
          <input
            type="date"
            v-model="form.date_of_birth"
            class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-amber text-black outline-none transition-colors"
          >
        </div>
        <div class="flex-1 min-w-[200px]">
          <label class="block text-purple-900 text-sm font-medium mb-1">Zip Code</label>
          <input
            type="text"
            v-model="form.zip"
            class="w-full border-b-2 border-purple-900 focus:border-purple-700 px-3 py-2 bg-amber text-black outline-none transition-colors placeholder-black"
            placeholder="Enter zip code"
          >
        </div>

        <!-- Buttons -->
        <div class="w-full flex justify-end mt-6">
          <button
            type="submit"
            class="px-4 py-2 bg-green text-white border-2 border-purple-900 rounded-lg shadow-md hover:bg-gray-800 transition-all font-medium focus:outline-none focus:ring-2 focus:ring-purple-900 focus:ring-opacity-50"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    employee: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        id: this.employee.id || '',
        email: this.employee.email || '',
        password: '', // Leave empty for edit (optional update)
        first_name: this.employee.name ? this.employee.name.split(' ')[0] : '',
        last_name: this.employee.name ? this.employee.name.split(' ')[1] || '' : '',
        role: this.employee.role || '--Select Role--',
        supervisor: this.employee.supervisor || '',
        phone_number: this.employee.phone || '',
        date_of_birth: this.employee.date_of_birth || '',
        zip: this.employee.zip || ''
      }
    };
  },
  methods: {
    saveChanges() {
      // Combine first and last name back into name for compatibility with original data structure
      const updatedEmployee = {
        ...this.form,
        name: `${this.form.first_name} ${this.form.last_name}`.trim(),
        phone: this.form.phone_number
      };
      // Only include password if it was changed
      if (!this.form.password) {
        delete updatedEmployee.password;
      }
      this.$emit('update-employee', updatedEmployee);
    }
  }
};
</script>

<style scoped>
.edit-employee-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* All other styling is handled by Tailwind classes in the template */
</style>