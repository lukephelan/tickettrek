<script setup>
import { DateTime } from 'luxon';
import { ref, computed } from 'vue'


function formatStartDateTime(dateString) {
  return DateTime.fromISO(dateString).toUTC().toISO({ includeOffset: false, suppressMilliseconds: true }) + 'Z';
}

function formatEndDateTime(dateString) {
  return DateTime.fromISO(dateString).plus({ days: 1 })
    .startOf('day').toUTC().toISO({ includeOffset: false, suppressMilliseconds: true }) + 'Z';
}


const size = ref(10);
const page = ref(1);
const startDateTime = ref('');
const endDateTime = ref('');

const startDateTimeInput = ref('')
const endDateTimeInput = ref('')

const params = computed(() => ({
  size: size.value,
  page: page.value,
  startDateTime: startDateTime.value ? formatStartDateTime(startDateTime.value) : undefined,
  endDateTime: endDateTime.value ? formatEndDateTime(endDateTime.value) : undefined,
}))

const { data, execute, status } = await useFetch('/api/events', { params });

const hasNext = computed(() => {
  return !!data.value.links?.next?.href;
})

const hasPrev = computed(() => {
  return !!data.value.links?.prev?.href;
})

function onNavNext() {
  page.value++;
  execute()
}
function onNavPrev() {
  if (page.value > 1) {
    page.value--;
  } else {
    page.value = 1;
  }
  execute()
}

function onSearch() {
  page.value = 1;
  startDateTime.value = startDateTimeInput.value;
  endDateTime.value = endDateTimeInput.value;
  execute();
}

</script>

<template>
  <div class="container m-auto text-light-gray w-100 xl:w-1/2">
    <div class="w-100 flex justify-between items-end py-5">
      <div>
        Start date: <input type="date" v-model="startDateTimeInput" data-name="start-date-time-input"
          class="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500">
      </div>
      <div>
        End date: <input type="date" v-model="endDateTimeInput" data-name="end-date-time-input"
          class="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500">
      </div>
      <div>
        <button class="rounded bg-light-gray text-dark-blue p-2 w-24 md:w-40 hover:bg-torquoise shadow"
          data-name="search-btn" @click="onSearch">Search</button>
      </div>
    </div>
    <div class="w-100 flex justify-between py-5">
      <div>
        <button v-if="hasPrev && page > 1"
          class="rounded bg-light-gray text-dark-blue p-2 w-24 md:w-40 hover:bg-torquoise shadow" data-name="prev-btn"
          @click="onNavPrev">
          Previous
        </button>
      </div>
      <div>
        <button v-if="hasNext" class="rounded bg-light-gray text-dark-blue p-2 w-24 md:w-40 hover:bg-torquoise shadow"
          :disabled="!hasNext" data-name="next-btn" @click="onNavNext">
          Next
        </button>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <SkeletonEventCard v-if="status === 'pending'" v-for="index in 10" :key="index" />
      <EventCard v-else v-for="event in data.events" :key="event.id" :event="event" />
    </div>
  </div>
</template>