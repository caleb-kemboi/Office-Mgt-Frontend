<template>
  <div class="modal">
    <div class="modal-content">
      <h2>Edit Employee</h2>
      <form @submit.prevent="submitForm">
        <!-- First Name -->
        <div class="form-group">
          <label>First Name:</label>
          <input 
            type="text"
            v-model="employeeData.first_name"
            class="input-field"
            required
          />
        </div>

        <!-- Last Name -->
        <div class="form-group">
          <label>Last Name:</label>
          <input 
            type="text"
            v-model="employeeData.last_name"
            class="input-field"
            required
          />
        </div>

        <!-- Email (Readonly) -->
        <div class="form-group">
          <label>Email:</label>
          <input 
            type="email"
            v-model="employeeData.email"
            class="input-field"
            readonly
          />
        </div>

        <!-- Role -->
        <div class="form-group">
          <label>Role:</label>
          <select 
            v-model="employeeData.role"
            class="input-field"
            required
          >
            <option value="" disabled>Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Employee">Employee</option>
            <option value="Receptionist">Receptionist</option>
          </select>
        </div>

        <!-- Supervisor Dropdown -->
        <div class="form-group">
          <label>Supervisor:</label>
          <select 
            v-model="employeeData.supervisor"
            class="input-field"
          >
            <option value="">No Supervisor</option>
            <option 
              v-for="supervisor in supervisors" 
              :key="supervisor.id" 
              :value="supervisor.id"
            >
              {{ supervisor.name }}
            </option>
          </select>
        </div>

        <!-- Phone Number -->
        <div class="form-group">
          <label>Phone:</label>
          <input 
            type="text"
            v-model="employeeData.phone"
            class="input-field"
          />
        </div>

        <!-- Action Buttons -->
        <div class="form-buttons">
          <button type="submit" class="btn-save">Save</button>
          <button type="button" @click="closeModal" class="btn-cancel">Cancel</button>
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
    employees: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      employeeData: { 
        ...this.employee,
        // Ensure first_name and last_name are correctly initialized
        first_name: this.employee.first_name || this.employee.name.split(' ')[0],
        last_name: this.employee.last_name || this.employee.name.split(' ').slice(1).join(' '),
        phone: this.employee.phone || '', // Ensure phone is defined
        supervisor: this.employee.supervisor || '', // Default to empty string if undefined
      },
    };
  },
  computed: {
    supervisors() {
      return this.employees.filter(emp => emp.id !== this.employee.id);
    },
  },
  methods: {
    submitForm() {
      // Emit the updated employee data, including the id
      this.$emit('update-employee', {
        id: this.employee.id,
        first_name: this.employeeData.first_name,
        last_name: this.employeeData.last_name,
        email: this.employeeData.email,
        role: this.employeeData.role,
        phone: this.employeeData.phone,
        supervisor: this.employeeData.supervisor || null,
      });
    },
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
}

.form-group {
  margin-bottom: 15px;
}

.input-field {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
}

.btn-save {
  background-color: #4CAF50;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
}

.btn-cancel {
  background-color: #f44336;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
}
</style>