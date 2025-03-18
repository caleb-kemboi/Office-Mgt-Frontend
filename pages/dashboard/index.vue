<template>
  <link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" />

  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Navbar -->
    <div class="h-16 bg-purple-900 text-white shadow-md flex items-center px-6 justify-between">
      <h1 class="text-lg font-semibold">Admin Dashboard</h1>

      <!-- Logout Button -->
      <button @click="logout"
        class="px-4 py-2 border-2 border-black text-purple-900 bg-white hover:bg-purple-700 hover:text-white transition-all duration-300">
        Logout
      </button>
    </div>

    <div class="flex flex-grow">
      <!-- Sidebar -->
      <div :class="['bg-white border-r-2 border-purple-900 shadow-lg flex flex-col transition-all duration-300',
                    sidebarCollapsed ? 'w-20' : 'w-56']">
        <button @click="toggleSidebar" class="p-4 focus:outline-none">
          <i :class="['bx', sidebarCollapsed ? 'bx-menu' : 'bx-x', 'text-black text-2xl transition-transform duration-300']"></i>
        </button>
        <ul class="flex flex-col py-4">
          <li v-for="(item, index) in menuItems" :key="index" class="transition-transform duration-300 hover:translate-x-2">
            <a href="#" @click.prevent="setActivePage(item.label)" class="flex items-center h-12 text-black hover:text-gray-700">
              <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-black">
                <i :class="['bx', item.icon, 'text-xl']"></i>
              </span>
              <span v-if="!sidebarCollapsed" class="text-sm font-medium transition-all duration-300">{{ item.label }}</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- Main Content -->
      <div class="flex-grow py-6 md:py-10 px-6 md:px-10">
        
        <!-- Home Section -->
        <div v-if="activePage === 'Home'">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center items-center">
            <div v-for="(widget, index) in widgets" :key="index" 
              class="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center w-64 h-40 transform transition-transform duration-500 hover:scale-105 border-2 border-purple-900 backdrop-blur-xl bg-opacity-90">
              <i :class="['bx', widget.icon, 'text-6xl text-purple-900']"></i>
              <h2 class="text-lg font-semibold mt-2">{{ widget.title }}</h2>
              <p class="text-gray-500">{{ widget.text }}</p>
            </div>
          </div>
        </div>

        <!-- Employees Section -->
        <div v-if="activePage === 'Employees'">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-purple-900">Employees</h3>
            <button @click="toggleForm" class="px-4 py-2 border-2 border-purple-900 border-double text-black rounded-lg shadow">
              Create New
            </button>
          </div>
          <p v-if="!showForm" class="mt-2">List of employees will be displayed here.</p>

          <!-- Form for Creating a New Employee -->
          <CreateEmployeeForm>
          </CreateEmployeeForm>  
        </div>

      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-black text-white text-center py-6 px-6 mt-0 border-t-4 border-black">
      &copy; 2025 Office Management System. All Rights Reserved.
    </footer>
  </div>
</template>

<script>
import CreateEmployeeForm from '~/components/CreateEmployeeForm.vue';

export default {
  components: {
    CreateEmployeeForm
    },
  // props:{},
  data() {
    return {
      sidebarCollapsed: window.innerWidth < 768,
      activePage: "Home",
      showForm: false,
      menuItems: [
        { label: "Home", icon: "bx-home" },
        { label: "Employees", icon: "bx-user" },
        { label: "Employee Travels", icon: "bx-car" },
        { label: "Visits", icon: "bx-pen" },
        { label: "Deliveries", icon: "bx-package" }
      ],
      widgets: [
        { title: "Employees", text: "Total: 50", icon: "bx-user" },
        { title: "Travels", text: "Pending: 12", icon: "bx-car" },
        { title: "Appointments", text: "Upcoming: 8", icon: "bx-calendar" },
        { title: "Deliveries", text: "Pending: 5", icon: "bx-package" }
      ],
      form: {
        name: "",
        email: "",
        role: "Employee"
      }
    };
  },
  methods: {
    logout() {
      console.log("Logging out...");
    },
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },
    setActivePage(page) {
      this.activePage = page;
      this.showForm = false; // Hide form when switching pages
    },
    toggleForm() {
      this.showForm = !this.showForm;
    },
    submitForm() {
      console.log("Employee Created:", this.form);
      alert("Employee Created Successfully!");
      this.toggleForm();
    }
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>
