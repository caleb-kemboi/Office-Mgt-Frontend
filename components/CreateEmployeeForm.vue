<template>
  <div class="p-6 shadow-lg rounded-lg border-2 border-purple-900">
    <h3 class="text-lg font-semibold text-purple-900 mb-4">Create Employee</h3>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label class="block text-purple-900">Name</label>
        <input 
          type="text" 
          v-model="form.name" 
          class="w-full border-b-2 border-purple-900 outline-none focus:border-purple-700 px-2 py-1 bg-transparent text-black"
        >
      </div>
      <div class="mb-4">
        <label class="block text-purple-900">Email</label>
        <input 
          type="email" 
          v-model="form.email" 
          class="w-full border-b-2 border-purple-900 outline-none focus:border-purple-700 px-2 py-1 bg-transparent text-black"
        >
      </div>
      <div class="mb-4">
        <label class="block text-purple-900">Role</label>
        <select 
          v-model="form.role" 
          class="w-full border-b-2 border-purple-900 outline-none focus:border-purple-700 px-2 py-1 bg-transparent text-black"
        >
          <option value="Employee">Employee</option>
          <option value="Employee">Receptionist</option>
          <option value="Supervisor">Supervisor</option>
        </select>
      </div>
      <div class="flex space-x-4 mt-6">
        <!-- Submit Button -->
        <button 
          type="submit" 
          class="px-4 py-2 border-2 border-double rounded-lg shadow transition-all bg-[#7f1d1d] border-[#4c1d95] text-[#ef4444] hover:bg-[#6b1a1a]"
        >
          Submit
        </button>
        <!-- Cancel Button -->
        <button 
          type="button" 
          @click="$emit('cancel')" 
          class="bg-[#7f1d1d] border-[#4c1d95] text-[#ef4444] px-4 py-2 border-2 border-double rounded-lg shadow transition-all hover:bg-[#6b1a1a]"
        >
          Cancel
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
        name: "",
        email: "",
        role: "Employee"
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