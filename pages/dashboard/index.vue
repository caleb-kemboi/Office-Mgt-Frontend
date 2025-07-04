<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Navbar -->
    <div class="h-16 bg-purple-900 text-white shadow-md flex items-center px-6 justify-between">
      <h1 class="text-lg font-semibold">Admin Dashboard</h1>
      <button
        @click="logout"
        class="px-4 py-2 border-2 rounded border-black text-purple-900 bg-amber-500 hover:bg-purple-700 hover:text-white transition-all duration-300"
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
              >{{ item.label }}</span>
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
              class="px-4 py-2 bg-gray text-white border-2 border-purple-900 rounded-lg shadow hover:bg-gray-700 transition-all"
            >
              Create New
            </button>
          </div>
          <div v-if="!showEmployeeForm && !showEditEmployeeForm">
            <EmployeeDirectory
              :employees="employees"
              :items-per-page="itemsPerPage"
              @delete-employee="deleteEmployee"
              @edit-employee="startEditingEmployee"
            />
          </div>
          <div v-if="showEmployeeForm" class="bg-white p-6 rounded-lg shadow-md">
            <CreateEmployeeForm @cancel="toggleEmployeeForm" @employee-added="addEmployee" />
          </div>
          <div v-if="showEditEmployeeForm" class="bg-white p-6 rounded-lg shadow-md">
            <EditEmployee
              :employee="selectedEmployee"
              @cancel="closeEditForm"
              @update-employee="handleUpdate"
            />
          </div>
        </div>

        <!-- Employee Travels Section -->
        <div v-if="activePage === 'Employee Travels'">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-purple-900">Employee Travels</h3>
            <button
              @click="toggleTravelForm"
              class="px-4 py-2 bg-gray text-white border-2 border-purple-900 rounded-lg shadow hover:bg-gray-700 transition-all"
            >
              Create New
            </button>
          </div>
          <div v-if="!showTravelForm">
            <EmployeeTravelList
              :travels="travels"
              :items-per-page="itemsPerPage"
              @delete-travel="deleteTravel"
              @edit-travel="editTravel"
            />
          </div>
          <div v-if="showTravelForm" class="bg-white p-6 rounded-lg shadow-md">
            <CreateTravelForm @cancel="toggleTravelForm" @travel-added="addTravel" />
          </div>
        </div>

        <!-- Employee Visits Section -->
        <div v-if="activePage === 'Visits'">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-purple-900">Employee Visits</h3>
            
            <button
              @click="toggleVisitForm"
              class="px-4 py-2 bg-gray-600 text-white border-2 border-purple-900 rounded-lg shadow hover:bg-gray-700 transition-all"
            >
              Create New
            </button>
          </div>
          <div v-if="!showVisitForm">
            <VisitsList
              :visits="visits"
              @edit-visit="editVisit"
              @delete-visit="deleteVisit"
            />
          </div>
          <div v-if="showVisitForm" class="bg-white p-6 rounded-lg shadow-md">
            <CreateEmployeeVisit @cancel="toggleVisitForm" @visit-added="addVisit" />
          </div>
        </div>

        <!-- Deliveries Section -->
        <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Other sections omitted -->
    <div v-if="activePage === 'Deliveries'">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-purple-900">Deliveries</h3>
        <button
          @click="toggleDeliveryForm"
          class="px-4 py-2 bg-gray-600 text-white border-2 border-purple-900 rounded-lg shadow hover:bg-gray-700 transition-all"
        >
          Create New
        </button>
      </div>
      <div v-if="!showCreateDeliveryForm">
        <DeliveryList
          :deliveries="deliveries"
          :pagination="pagination"
          :loading="loading"
          :errorMessage="errorMessage"
        />
      </div>
      <AddDelivery
        v-if="showCreateDeliveryForm"
        @create-delivery="createDelivery"
        @cancel="closeDeliveryForm"
      />
    </div>
    <!-- Other sections omitted -->
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
import { ref } from 'vue';
import { onMounted, onUnmounted } from 'vue';
import EmployeeDirectory from '@/components/EmployeeDirectory.vue';
import EmployeeTravelList from '@/components/EmployeeTravelList.vue';
import CreateEmployeeForm from '@/components/CreateEmployeeForm.vue';
import EditEmployee from '@/components/EditEmployee.vue';
import CreateTravelForm from '@/components/CreateTravelForm.vue';
import CreateEmployeeVisit from '~/components/CreateEmployeeVisit.vue';
import VisitsList from '~/components/VisitsList.vue';
import DeliveryList from '~/components/DeliveryList.vue';
import CreateDeliveryForm from '~/components/CreateDeliveryForm.vue';
import AddDelivery from '~/components/AddDelivery.vue';

// External CSS
useHead({
  link: [{ rel: 'stylesheet', href: 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' }],
});

// Base URL for API
const BASE_URL = 'http://127.0.0.1:8000';

definePageMeta({
  middleware: ['roles'],
  roles: ['admin']
});

// Reactive state
const employees = useState('employees', () => []);
const travels = useState('travels', () => []);
const visits = useState('visits', () => []);
const isLoading = useState('isLoading', () => ({ employees: true, travels: true }));
const isLoadingVisits = useState('isLoadingVisits', () => true);
const sidebarCollapsed = useState('sidebarCollapsed', () => process.client ? window.innerWidth < 768 : false);
const activePage = useState('activePage', () => 'Home');
const showEmployeeForm = useState('showEmployeeForm', () => false);
const showTravelForm = useState('showTravelForm', () => false);
const showVisitForm = useState('showVisitForm', () => false);
const showEditEmployeeForm = useState('showEditEmployeeForm', () => false);
const selectedEmployee = useState('selectedEmployee', () => null);
const itemsPerPage = useState('itemsPerPage', () => 5);
const showCreateDeliveryForm = ref(false);
const deliveries = ref([]);
const loading = ref(false);
const errorMessage = ref(null);
const pagination = ref({ currentPage: 1, itemsPerPage: 5 });

// Static data
const menuItems = [
  { label: 'Home', icon: 'bx-home' },
  { label: 'Employees', icon: 'bx-user' },
  { label: 'Employee Travels', icon: 'bx-car' },
  { label: 'Visits', icon: 'bx-pen' },
  { label: 'Deliveries', icon: 'bx-package' },
];

const widgets = [
  { title: 'Employees', text: 'Total: 5', icon: 'bx-user' },
  { title: 'Travels', text: 'Pending: 6', icon: 'bx-car' },
  { title: 'Appointments', text: 'Upcoming: 8', icon: 'bx-calendar' },
  { title: 'Deliveries', text: 'Pending: 5', icon: 'bx-package' },
];

// Deliveries Methods
const fetchDeliveries = async () => {
  loading.value = true;
  errorMessage.value = null;
  try {
    console.log('Fetching deliveries...');
    const response = await $fetch(`${BASE_URL}/deliveries/deliveries/`);
    deliveries.value = response.deliveries || [];
    pagination.value = { currentPage: 1, itemsPerPage: 5, totalItems: deliveries.value.length };
  } catch (error) {
    console.error('Error fetching deliveries:', error);
    errorMessage.value = 'Failed to fetch deliveries.';
  } finally {
    loading.value = false;
  }
};


const createDelivery = async (delivery) => {
  try {
    const payload = {
      item_name: delivery.item_name,
      sender_name: delivery.sender_name,
      employee_email: delivery.employee_email,
      delivery_description: delivery.delivery_description,
      delivery_date: delivery.delivery_date,
      delivery_time: delivery.delivery_time
    };
    console.log('Creating delivery with payload:', payload);
    await $fetch(`${BASE_URL}/deliveries/create/`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });
    await fetchDeliveries();
    showCreateDeliveryForm.value = false;
    activePage.value = 'Deliveries';
    alert('Delivery request created successfully!');
  } catch (error) {
    console.error('Error creating delivery:', error);
    alert(`Error: ${error.response?._data?.error || error.message}`);
  }
};

const toggleDeliveryForm = () => {
  console.log('Toggling delivery form, current state:', showCreateDeliveryForm.value);
  showCreateDeliveryForm.value = !showCreateDeliveryForm.value;
  if (showCreateDeliveryForm.value) {
    console.log('Form opened, collapsing sidebar');
    sidebarCollapsed.value = true;
  } else {
    console.log('Form closed, redirecting to Deliveries');
    activePage.value = 'Deliveries';
  }
};

const closeDeliveryForm = () => {
  console.log('Closing delivery form via cancel event, redirecting to Deliveries');
  showCreateDeliveryForm.value = false;
  activePage.value = 'Deliveries';
};

// Other Methods (Unchanged)
const fetchVisits = async () => {
  try {
    const response = await $fetch(`${BASE_URL}/visitors/list/`);
    visits.value = Array.isArray(response.visits) ? response.visits : [];
  } catch (error) {
    console.error('Error fetching visits:', error);
    visits.value = [];
  } finally {
    isLoadingVisits.value = false;
  }
};

const addVisit = async (visit) => {
  try {
    const payload = {
      visitor_first_name: visit.visitor_first_name,
      visitor_last_name: visit.visitor_last_name,
      visitor_phone: visit.visitor_phone,
      visitor_email: visit.visitor_email,
      visit_purpose: visit.visit_purpose,
      visit_date: visit.visit_date,
      visit_time: visit.visit_time,
      employee_email: visit.employee_email,
    };
    const newVisit = await $fetch(`${BASE_URL}/visitors/create/`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });
    visits.value.push(newVisit);
    toggleVisitForm();
    alert('Visit created successfully!');
  } catch (error) {
    console.error('Error adding visit:', error);
    alert(`Failed to add visit: ${error.message}`);
  }
};

const deleteVisit = async (id) => {
  try {
    await $fetch(`${BASE_URL}/visitors/delete/${id}/`, {
      method: 'DELETE',
    });
    visits.value = visits.value.filter(visit => visit.id !== id);
    console.log(`Visit ${id} deleted`);
  } catch (error) {
    console.error('Error deleting visit:', error);
    alert(`Failed to delete visit: ${error.message}`);
  }
};


const toggleVisitForm = () => {
  showVisitForm.value = !showVisitForm.value;
  if (showVisitForm.value) sidebarCollapsed.value = true;
};

const fetchEmployees = async () => {
  try {
    const response = await $fetch(`${BASE_URL}/user_mgt/employees/`);
    employees.value = response.employees.map(emp => ({
      id: emp.id,
      name: `${emp.first_name || ''} ${emp.last_name || ''}`.trim() || 'N/A',
      email: emp.email,
      phone: emp.phone_number || 'N/A',
      role: emp.role || 'Employee',
    }));
  } catch (error) {
    console.error('Error fetching employees:', error);
    employees.value = [];
  } finally {
    isLoading.value.employees = false;
  }
};

const fetchTravels = async () => {
  try {
    const response = await $fetch(`${BASE_URL}/employee_travels/travels/`);
    travels.value = Array.isArray(response.travels) ? response.travels : [];
  } catch (error) {
    console.error('Error fetching travels:', error);
    travels.value = [];
  } finally {
    isLoading.value.travels = false;
  }
};

const addEmployee = async (employee) => {
  try {
    const [first_name, ...lastNameParts] = employee.name.split(' ');
    const last_name = lastNameParts.join(' ') || '';
    const payload = {
      first_name,
      last_name,
      email: employee.email,
      phone_number: employee.phone,
      role: employee.role || 'Employee',
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
    await $fetch(`${BASE_URL}/user_mgt/employee_delete/${id}/`, {
      method: 'DELETE',
    });
    employees.value = employees.value.filter(emp => emp.id !== id);
    console.log(`Employee ${id} deleted`);
  } catch (error) {
    console.error('Error deleting employee:', error);
    alert(`Failed to delete employee: ${error.message}`);
  }
};

const handleUpdate = async (updatedEmployee) => {
  try {
    const payload = {
      first_name: updatedEmployee.first_name,
      last_name: updatedEmployee.last_name,
      email: updatedEmployee.email,
      phone_number: updatedEmployee.phone || '',
      role: updatedEmployee.role,
      supervisor: updatedEmployee.supervisor || null,
    };
    const response = await $fetch(`${BASE_URL}/user_mgt/employee_update/${updatedEmployee.id}/`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });
    const index = employees.value.findIndex(emp => emp.id === updatedEmployee.id);
    if (index !== -1) {
      employees.value[index] = {
        id: response.id,
        name: `${response.first_name} ${response.last_name}`,
        email: response.email,
        phone: response.phone_number || 'N/A',
        role: response.role || 'Employee',
      };
    }
    closeEditForm();
  } catch (error) {
    console.error('Error updating employee:', error);
    alert(`Failed to update employee: ${error.message}`);
  }
};

const addTravel = async (travel) => {
  try {
    const payload = {
      travel_title: travel.travel_title,
      employee_email: travel.employee_email,
      travel_purpose: travel.travel_purpose,
      travel_date_from: travel.travel_date_from,
      travel_date_to: travel.travel_date_to,
      travel_destination: travel.travel_destination,
      mode_of_transport: travel.mode_of_transport,
      travel_budget: travel.travel_budget,
    };
    const newTravel = await $fetch(`${BASE_URL}/employee_travels/request/`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });
    travels.value.push(newTravel);
    toggleTravelForm();
  } catch (error) {
    console.error('Error adding travel:', error);
    alert(`Failed to add travel: ${error.message}`);
  }
};

const deleteTravel = async (id) => {
  try {
    await $fetch(`${BASE_URL}/employee_travels/travel_detail/${id}/`, {
      method: 'DELETE',
    });
    travels.value = travels.value.filter(travel => travel.id !== id);
    console.log(`Travel ${id} deleted`);
  } catch (error) {
    console.error('Error deleting travel:', error);
    alert(`Failed to delete travel: ${error.message}`);
  }
};

const editTravel = (id) => {
  console.log(`Edit travel ${id} - Implement form here`);
};

// Methods
const logout = () => console.log('Logging out...');
const toggleSidebar = () => (sidebarCollapsed.value = !sidebarCollapsed.value);
const setActivePage = (page) => {
  activePage.value = page;
  showEmployeeForm.value = false;
  showTravelForm.value = false;
  showVisitForm.value = false;
  showEditEmployeeForm.value = false;
  showCreateDeliveryForm.value = false;
  if (page === 'Deliveries') {
    console.log('Switched to Deliveries, fetching data...');
    fetchDeliveries();
  }
};
const toggleEmployeeForm = () => {
  showEmployeeForm.value = !showEmployeeForm.value;
  if (showEmployeeForm.value) sidebarCollapsed.value = true;
};
const toggleTravelForm = () => {
  showTravelForm.value = !showTravelForm.value;
  if (showTravelForm.value) sidebarCollapsed.value = true;
};
const startEditingEmployee = (employee) => {
  selectedEmployee.value = {
    ...employee,
    first_name: employee.name.split(' ')[0],
    last_name: employee.name.split(' ').slice(1).join(' ') || '',
    phone: employee.phone || '',
    supervisor: employee.supervisor || '',
  };
  showEditEmployeeForm.value = true;
};
const closeEditForm = () => {
  showEditEmployeeForm.value = false;
  selectedEmployee.value = null;
};

// Fetch data on mount, only client-side
if (process.client) {
  onMounted(() => {
    console.log('Mounted, fetching initial data...');
    fetchEmployees();
    fetchTravels();
    fetchVisits();
    if (activePage.value === 'Deliveries') {
      console.log('Initial page is Deliveries, fetching...');
      fetchDeliveries();
    }
    window.addEventListener('resize', () => (sidebarCollapsed.value = window.innerWidth < 768));
  });

  onUnmounted(() => {
    window.removeEventListener('resize', () => (sidebarCollapsed.value = window.innerWidth < 768));
  });
}
</script>