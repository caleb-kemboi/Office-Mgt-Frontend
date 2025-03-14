<template>
  <link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" />

  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Top Bar -->
    <div class="h-16 bg-white shadow-md border-b-4 border-black flex items-center px-6">
      <h1 class="text-lg font-semibold text-gray-700">Dashboard</h1>
    </div>

    <div class="flex flex-row flex-grow">
      <!-- Sidebar -->
      <div :class="['flex flex-col bg-white rounded-r-3xl overflow-hidden border-r-4 border-purple-900 shadow-lg transition-all duration-300', sidebarCollapsed ? 'w-20' : 'w-56']">
        <button @click="sidebarCollapsed = !sidebarCollapsed" class="p-2 focus:outline-none">
          <i :class="['bx', sidebarCollapsed ? 'bx-menu' : 'bx-x', 'text-purple-900 text-2xl']"></i>
        </button>
        <ul class="flex flex-col py-4">
          <li>
            <a href="#" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
              <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-purple-900"><i class="bx bx-home"></i></span>
              <span v-if="!sidebarCollapsed" class="text-sm font-medium">Home</span>
            </a>
          </li>
          <li>
            <a href="#" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
              <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-purple-900"><i class="bx bx-user"></i></span>
              <span v-if="!sidebarCollapsed" class="text-sm font-medium">Employees</span>
            </a>
          </li>
          <li>
            <a href="#" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
              <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-purple-900"><i class="bx bx-car"></i></span>
              <span v-if="!sidebarCollapsed" class="text-sm font-medium">Employee Travels</span>
            </a>
          </li>
          <li>
            <a href="#" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
              <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-purple-900"><i class="bx bx-pen"></i></span>
              <span v-if="!sidebarCollapsed" class="text-sm font-medium">Visits</span>
            </a>
          </li>
          <li>
            <a href="#" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
              <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-purple-900"><i class="bx bx-package"></i></span>
              <span v-if="!sidebarCollapsed" class="text-sm font-medium">Deliveries</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- Main Content -->
      <div class="flex-grow p-10 pt-20">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center items-center">
          <!-- Employees Widget -->
          <div class="bg-white rounded-lg shadow-md p-8 flex flex-col items-center w-64 h-40">
            <i class="bx bx-user text-6xl text-purple-900"></i>
            <h2 class="text-lg font-semibold mt-2">Employees</h2>
            <p class="text-gray-500">Total: 50</p>
          </div>

          <!-- Travels Widget -->
          <div class="bg-white rounded-lg shadow-md p-8 flex flex-col items-center w-64 h-40">
            <i class="bx bx-car text-6xl text-purple-900"></i>
            <h2 class="text-lg font-semibold mt-2">Travels</h2>
            <p class="text-gray-500">Pending: 12</p>
          </div>

          <!-- Appointments Widget -->
          <div class="bg-white rounded-lg shadow-md p-8 flex flex-col items-center w-64 h-40">
            <i class="bx bx-calendar text-6xl text-purple-900"></i>
            <h2 class="text-lg font-semibold mt-2">Appointments</h2>
            <p class="text-gray-500">Upcoming: 8</p>
          </div>

          <!-- Deliveries Widget -->
          <div class="bg-white rounded-lg shadow-md p-8 flex flex-col items-center w-64 h-40">
            <i class="bx bx-package text-6xl text-purple-900"></i>
            <h2 class="text-lg font-semibold mt-2">Deliveries</h2>
            <p class="text-gray-500">Pending: 5</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarCollapsed: false,
    };
  },
};
</script>
