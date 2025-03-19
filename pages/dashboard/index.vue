<template>
  <link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" />
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Navbar -->
    <div class="h-16 bg-purple-900 text-white shadow-md flex items-center px-6 justify-between">
      <h1 class="text-lg font-semibold">Dashboard ({{ authStore.user?.role || 'Guest' }})</h1>
      <button
        @click="logout"
        class="px-4 py-2 border-2 border-black text-purple-900 bg-white hover:bg-purple-700 hover:text-white transition-all duration-300"
      >
        Logout
      </button>
    </div>

    <div class="flex flex-grow">
      <!-- Sidebar -->
      <div
        :class="[
          'bg-white border-r-2 border-purple-900 shadow-lg flex flex-col transition-all duration-300',
          sidebarCollapsed ? 'w-20' : 'w-56',
        ]"
      >
        <button @click="toggleSidebar" class="p-4 focus:outline-none">
          <i
            :class="[
              'bx',
              sidebarCollapsed ? 'bx-menu' : 'bx-x',
              'text-black text-2xl transition-transform duration-300',
            ]"
          ></i>
        </button>
        <ul class="flex flex-col py-4">
          <li
            v-for="(item, index) in filteredMenuItems"
            :key="index"
            class="transition-transform duration-300 hover:translate-x-2"
          >
            <a
              href="#"
              @click.prevent="setActivePage(item.label)"
              class="flex items-center h-12 text-black hover:text-gray-700"
            >
              <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-black">
                <i :class="['bx', item.icon, 'text-xl']"></i>
              </span>
              <span
                v-if="!sidebarCollapsed"
                class="text-sm font-medium transition-all duration-300"
                >{{ item.label }}</span
              >
            </a>
          </li>
        </ul>
      </div>

      <!-- Main Content -->
      <div class="flex-grow py-6 md:py-10 px-6 md:px-10">
        <!-- Home Section -->
        <div v-if="activePage === 'Home'">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center items-center">
            <div
              v-for="(widget, index) in filteredWidgets"
              :key="index"
              class="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center w-64 h-40 transform transition-transform duration-500 hover:scale-105 border-2 border-purple-900 backdrop-blur-xl bg-opacity-90"
            >
              <i :class="['bx', widget.icon, 'text-6xl text-purple-900']"></i>
              <h2 class="text-lg font-semibold mt-2">{{ widget.title }}</h2>
              <p class="text-gray-500">{{ widget.text }}</p>
            </div>
          </div>
        </div>

        <!-- Employees Section (Admin only) -->
        <div v-if="activePage === 'Employees' && authStore.user?.role === 'admin'">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-purple-900">Employees</h3>
            <button
              @click="toggleEmployeeForm"
              class="px-4 py-2 border-2 border-purple-900 border-double text-black rounded-lg shadow hover:bg-purple-100 transition-all"
            >
              Create New
            </button>
          </div>
          <p v-if="!showEmployeeForm" class="mt-2 text-gray-600">List of employees will be displayed here.</p>
          <div v-if="showEmployeeForm" class="bg-white p-6 rounded-lg shadow-md">
            <CreateEmployeeForm @cancel="toggleEmployeeForm" @submit="submitEmployee" />
          </div>
        </div>

        <!-- Employee Travels Section (Admin and Employee) -->
        <div v-if="activePage === 'Employee Travels' && (authStore.user?.role === 'admin' || authStore.user?.role === 'employee')">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-purple-900">Employee Travels</h3>
            <button
              v-if="authStore.user?.role === 'employee'"
              @click="toggleTravelForm"
              class="px-4 py-2 border-2 border-purple-900 border-double text-black rounded-lg shadow hover:bg-purple-100 transition-all"
            >
              Create New
            </button>
          </div>
          <p v-if="!showTravelForm" class="mt-2 text-gray-600">List of employee travels will be displayed here.</p>
          <div v-if="showTravelForm" class="bg-white p-6 rounded-lg shadow-md">
            <CreateTravelForm @cancel="toggleTravelForm" @submit="submitTravel" />
          </div>
        </div>

        <!-- Visits Section (Admin and Receptionist) -->
        <div v-if="activePage === 'Visits' && (authStore.user?.role === 'admin' || authStore.user?.role === 'receptionist')">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-purple-900">Visits</h3>
            <button
              @click="toggleVisitForm"
              class="px-4 py-2 border-2 border-purple-900 border-double text-black rounded-lg shadow hover:bg-purple-100 transition-all"
            >
              Create New
            </button>
          </div>
          <p v-if="!showVisitForm" class="mt-2 text-gray-600">List of visits will be displayed here.</p>
          <div v-if="showVisitForm" class="bg-white p-6 rounded-lg shadow-md">
            <CreateVisitForm @cancel="toggleVisitForm" @submit="submitVisit" />
          </div>
        </div>

        <!-- Deliveries Section (Admin and Receptionist) -->
        <div v-if="activePage === 'Deliveries' && (authStore.user?.role === 'admin' || authStore.user?.role === 'receptionist')">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-purple-900">Deliveries</h3>
            <button
              @click="toggleDeliveryForm"
              class="px-4 py-2 border-2 border-purple-900 border-double text-black rounded-lg shadow hover:bg-purple-100 transition-all"
            >
              Create New
            </button>
          </div>
          <p v-if="!showDeliveryForm" class="mt-2 text-gray-600">List of deliveries will be displayed here.</p>
          <div v-if="showDeliveryForm" class="bg-white p-6 rounded-lg shadow-md">
            <CreateDeliveryForm @cancel="toggleDeliveryForm" @submit="submitDelivery" />
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-black text-white text-center py-6 px-6 mt-0 border-t-4 border-black">
      © 2025 Office Management System. All Rights Reserved.
    </footer>
  </div>
</template>

<script>
import { useAuthStore } from '~/stores/stores'; // Adjust path if needed
import CreateEmployeeForm from '~/components/CreateEmployeeForm.vue';
import CreateTravelForm from '~/components/CreateTravelForm.vue';
import CreateVisitForm from '~/components/CreateVisitForm.vue';
import CreateDeliveryForm from '~/components/CreateDeliveryForm.vue';

export default {
  components: {
    CreateEmployeeForm,
    CreateTravelForm,
    CreateVisitForm,
    CreateDeliveryForm,
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      sidebarCollapsed: window.innerWidth < 768,
      activePage: 'Home',
      showEmployeeForm: false,
      showTravelForm: false,
      showVisitForm: false,
      showDeliveryForm: false,
      menuItems: [
        { label: 'Home', icon: 'bx-home', roles: ['admin', 'employee', 'receptionist'] },
        { label: 'Employees', icon: 'bx-user', roles: ['admin'] },
        { label: 'Employee Travels', icon: 'bx-car', roles: ['admin', 'employee'] },
        { label: 'Visits', icon: 'bx-pen', roles: ['admin', 'receptionist'] },
        { label: 'Deliveries', icon: 'bx-package', roles: ['admin', 'receptionist'] },
      ],
      widgets: [
        { title: 'Employees', text: 'Total: 50', icon: 'bx-user', roles: ['admin'] },
        { title: 'Travels', text: 'Pending: 12', icon: 'bx-car', roles: ['admin', 'employee'] },
        { title: 'Appointments', text: 'Upcoming: 8', icon: 'bx-calendar', roles: ['admin', 'receptionist'] },
        { title: 'Deliveries', text: 'Pending: 5', icon: 'bx-package', roles: ['admin', 'receptionist'] },
      ],
    };
  },
  computed: {
    filteredMenuItems() {
      return this.menuItems.filter(item => item.roles.includes(this.authStore.user?.role));
    },
    filteredWidgets() {
      return this.widgets.filter(widget => widget.roles.includes(this.authStore.user?.role));
    },
  },
  methods: {
    async fetchUser() {
      await this.authStore.fetchUser();
      if (!this.authStore.user) {
        this.logout();
      }
    },
    async logout() {
      await this.authStore.logout();
      this.$router.push('/login');
    },
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },
    setActivePage(page) {
      this.activePage = page;
      this.showEmployeeForm = false;
      this.showTravelForm = false;
      this.showVisitForm = false;
      this.showDeliveryForm = false;
    },
    toggleEmployeeForm() {
      this.showEmployeeForm = !this.showEmployeeForm;
      if (this.showEmployeeForm) this.sidebarCollapsed = true;
    },
    toggleTravelForm() {
      this.showTravelForm = !this.showTravelForm;
      if (this.showTravelForm) this.sidebarCollapsed = true;
    },
    toggleVisitForm() {
      this.showVisitForm = !this.showVisitForm;
      if (this.showVisitForm) this.sidebarCollapsed = true;
    },
    toggleDeliveryForm() {
      this.showDeliveryForm = !this.showDeliveryForm;
      if (this.showDeliveryForm) this.sidebarCollapsed = true;
    },
    async submitEmployee(formData) {
      await this.submitToApi('/api/employees/', formData);
      this.toggleEmployeeForm();
    },
    async submitTravel(formData) {
      formData.employee_email = this.authStore.user.email; // Add logged-in user's email
      await this.submitToApi('/api/apply_for_travel/', formData);
      this.toggleTravelForm();
    },
    async submitVisit(formData) {
      await this.submitToApi('/api/visits/', formData);
      this.toggleVisitForm();
    },
    async submitDelivery(formData) {
      await this.submitToApi('/api/deliveries/', formData);
      this.toggleDeliveryForm();
    },
    async submitToApi(endpoint, data) {
      try {
        const response = await $fetch(`${BASE_URL}${endpoint}`, {
          method: 'POST',
          body: data,
          credentials: 'include', // Use session cookies
        });
        alert('Submitted successfully!');
        return response;
      } catch (error) {
        console.error('Submission failed:', error);
        alert('Failed to submit: ' + (error.response?.error || 'Unknown error'));
        throw error;
      }
    },
  },
  async mounted() {
    await this.fetchUser();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>