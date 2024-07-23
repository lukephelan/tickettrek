<script setup>
const date = defineModel();
const { label } = defineProps({ label: { type: String, required: true } });
</script>

<template>
  <div>
    <label for="date">{{ label }}</label>
    <input
      id="date"
      v-model="date"
      type="date"
      class="h-12 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 text-black"
    >
  </div>
</template>