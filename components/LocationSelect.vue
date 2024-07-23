<script setup>
const selectedState = defineModel()
</script>

<template>
  <div>
    <label for="states">Select location:</label>
    <select id="states"
      class="h-12 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 text-black"
      v-model="selectedState">
      <option value="">All of Australia</option>
      <option value="NSW">New South Wales</option>
      <option value="VIC">Victoria</option>
      <option value="QLD">Queensland</option>
      <option value="SA">South Australia</option>
      <option value="WA">Western Australia</option>
      <option value="TAS">Tasmania</option>
      <option value="NT">Northern Territory</option>
      <option value="ACT">Australian Capital Territory</option>
    </select>
  </div>
</template>