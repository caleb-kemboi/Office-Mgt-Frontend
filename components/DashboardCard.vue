<template>
  <div class="bg-purple-700 p-6 rounded-xl shadow-md text-center">
    <h3 class="text-lg font-semibold">{{ title }}</h3>
    <p class="text-2xl font-bold mt-2">{{ count }}</p>
  </div>
</template>

<script setup>
defineProps(["title", "count"]);
</script>
