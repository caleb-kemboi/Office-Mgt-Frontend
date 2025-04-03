<template>
  <div class="visit-form">
    <h2 class="form-heading">Create Employee Visit</h2>
    
    <form @submit.prevent="submitVisit" class="grid-form">
      <div class="form-group">
        <label>Visitor First Name:</label>
        <input v-model="visit.visitor_first_name" type="text" required placeholder="Enter visitor's first name">
      </div>

      <div class="form-group">
        <label>Visitor Last Name:</label>
        <input v-model="visit.visitor_last_name" type="text" required placeholder="Enter visitor's last name">
      </div>

      <div class="form-group">
        <label>Visitor Phone:</label>
        <input v-model="visit.visitor_phone" type="tel" required placeholder="Enter visitor's phone number">
      </div>

      <div class="form-group">
        <label>Visitor Email:</label>
        <input v-model="visit.visitor_email" type="email" required placeholder="Enter visitor's email">
      </div>

      <div class="form-group">
        <label>Visit Purpose:</label>
        <textarea v-model="visit.visit_purpose" required placeholder="Enter purpose of visit"></textarea>
      </div>

      <div class="form-group">
        <label>Visit Date:</label>
        <input v-model="visit.visit_date" type="date" required>
      </div>

      <div class="form-group">
        <label>Visit Time:</label>
        <input v-model="visit.visit_time" type="time" required>
      </div>

      <div class="form-group">
        <label>Employee Email:</label>
        <input v-model="visit.employee_email" type="email" required placeholder="Enter employee's email">
      </div>

      <button type="submit" class="submit-btn">Create Visit</button>
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
    };
  },
  methods: {
    submitVisit() {
      this.$emit('create-visit', { ...this.visit });
      this.resetForm();
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
    },
  },
};
</script>

<style scoped>
.visit-form {
  margin: 20px;
  padding: 20px;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.form-heading {
  background-color: #4B0082; /* Purple header */
  color: white;
  padding: 15px;
  text-align: center;
  margin-bottom: 10px;
  border-radius: 5px;
}

.grid-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 3px;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

.submit-btn {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #0056b3;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .grid-form {
    grid-template-columns: 1fr; /* Stacks fields vertically on smaller screens */
  }

  .visit-form {
    margin: 10px; /* Adjust the form margins on smaller screens */
    padding: 15px;
  }
}
</style>
