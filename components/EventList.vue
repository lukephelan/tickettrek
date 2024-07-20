<script setup lang="ts">
const { data: events } = await useFetch('/api/events')
</script>

<template>
  <ul>
    <li
      v-for="event in events"
      :key="event.id"
    >
      {{ event.name }}
    </li>
  </ul>
</template>