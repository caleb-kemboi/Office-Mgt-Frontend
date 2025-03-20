<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Navbar -->
    <div class="h-16 bg-purple-900 text-white shadow-md flex items-center px-6 justify-between">
      <h1 class="text-lg font-semibold">Admin Dashboard</h1>
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
            v-for="(item, index) in menuItems"
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
              v-for="(widget, index) in widgets"
              :key="index"
              class="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center w-64 h-40 transform transition-transform duration-500 hover:scale-105 border-2 border-purple-900 backdrop-blur-xl bg-opacity-90"
            >
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
            <button
              @click="toggleEmployeeForm"
              class="px-4 py-2 bg-gray-800 text-white border-2 border-purple-900 rounded-lg shadow hover:bg-gray-700 transition-all"
            >
              Create New
            </button>
          </div>
          <div v-if="!showEmployeeForm">
            <EmployeeDirectory
              :employees="employees"
              :items-per-page="itemsPerPage"
              @delete-employee="deleteEmployee"
            />
          </div>
          <div v-if="showEmployeeForm" class="bg-white p-6 rounded-lg shadow-md">
            <CreateEmployeeForm @cancel="toggleEmployeeForm" @employee-added="addEmployee" />
          </div>
        </div>

        <!-- Other Sections -->
        <div v-if="activePage === 'Employee Travels'">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-purple-900">Employee Travels</h3>
            <button
              @click="toggleTravelForm"
              class="px-4 py-2 bg-gray-800 text-white border-2 border-purple-900 rounded-lg shadow hover:bg-gray-700 transition-all"
            >
              Create New
            </button>
          </div>
          <p v-if="!showTravelForm" class="mt-2 text-gray-600">List of employee travels will be displayed here.</p>
          <div v-if="showTravelForm" class="bg-white p-6 rounded-lg shadow-md">
            <CreateTravelForm @cancel="toggleTravelForm" />
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

<script setup>
import { useState } from '#app';

// External CSS
useHead({
  link: [{ rel: 'stylesheet', href: 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' }],
});

// Base URL for API (adjust as needed)
const BASE_URL = 'http://127.0.0.1:8000';

// Reactive state (store-like)
const employees = useState('employees', () => []);
const sidebarCollapsed = useState('sidebarCollapsed', () => process.client ? window.innerWidth < 768 : false);
const activePage = useState('activePage', () => 'Home');
const showEmployeeForm = useState('showEmployeeForm', () => false);
const showTravelForm = useState('showTravelForm', () => false);
const itemsPerPage = useState('itemsPerPage', () => 5);

// Static data
const menuItems = [
  { label: 'Home', icon: 'bx-home' },
  { label: 'Employees', icon: 'bx-user' },
  { label: 'Employee Travels', icon: 'bx-car' },
  { label: 'Visits', icon: 'bx-pen' },
  { label: 'Deliveries', icon: 'bx-package' },
];

const widgets = [
  { title: 'Employees', text: 'Total: 50', icon: 'bx-user' },
  { title: 'Travels', text: 'Pending: 12', icon: 'bx-car' },
  { title: 'Appointments', text: 'Upcoming: 8', icon: 'bx-calendar' },
  { title: 'Deliveries', text: 'Pending: 5', icon: 'bx-package' },
];

// Fetch employees and map fields
const fetchEmployees = async () => {
  try {
    const response = await $fetch(`${BASE_URL}/user_mgt/employees/`);
    employees.value = response.employees.map(emp => ({
      id: emp.id,
      name: `${emp.first_name} ${emp.last_name}`, // Combine first_name and last_name
      email: emp.email,
      phone: emp.phone_number || 'N/A', // Use phone_number, fallback to 'N/A' if null
      role: emp.role || 'Employee', // Assuming role might be added; fallback to 'Employee'
    }));
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
};

// CRUD Operations
const addEmployee = async (employee) => {
  try {
    // Split name into first_name and last_name for backend compatibility
    const [first_name, ...lastNameParts] = employee.name.split(' ');
    const last_name = lastNameParts.join(' ') || '';
    const payload = {
      first_name,
      last_name,
      email: employee.email,
      phone_number: employee.phone,
      role: employee.role || 'Employee', // Default role if not provided
    };
    const newEmployee = await $fetch(`${BASE_URL}/user_mgt/employees/`, {
      method: 'POST',
      body: payload,
    });
    employees.value.push({
      id: newEmployee.id,
      name: `${newEmployee.first_name} ${newEmployee.last_name}`,
      email: newEmployee.email,
      phone: newEmployee.phone_number || 'N/A',
      role: newEmployee.role || 'Employee',
    });
    toggleEmployeeForm();
  } catch (error) {
    console.error('Error adding employee:', error);
  }
};

const deleteEmployee = async (id) => {
  try {
    await $fetch(`${BASE_URL}/user_mgt/employees/${id}/`, {
      method: 'DELETE',
    });
    employees.value = employees.value.filter(emp => emp.id !== id);
  } catch (error) {
    console.error('Error deleting employee:', error);
  }
};

// Methods
const logout = () => console.log('Logging out...');
const toggleSidebar = () => (sidebarCollapsed.value = !sidebarCollapsed.value);
const setActivePage = (page) => {
  activePage.value = page;
  showEmployeeForm.value = false;
  showTravelForm.value = false;
};
const toggleEmployeeForm = () => {
  showEmployeeForm.value = !showEmployeeForm.value;
  if (showEmployeeForm.value) sidebarCollapsed.value = true;
};
const toggleTravelForm = () => {
  showTravelForm.value = !showTravelForm.value;
  if (showTravelForm.value) sidebarCollapsed.value = true;
};

// Fetch employees on mount (client-side)
onMounted(() => {
  fetchEmployees();
  if (process.client) {
    window.addEventListener('resize', () => (sidebarCollapsed.value = window.innerWidth < 768));
  }
});

// Cleanup
onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('resize', () => (sidebarCollapsed.value = window.innerWidth < 768));
  }
});
</script>