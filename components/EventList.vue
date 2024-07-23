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
const selectedState = ref('')
const startDateTime = ref('');
const endDateTime = ref('');

const selectedStateOption = ref('')
const startDateTimeInput = ref('')
const endDateTimeInput = ref('')

const params = computed(() => ({
  size: size.value,
  page: page.value,
  stateCode: selectedState.value,
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
  selectedState.value = selectedStateOption.value;
  startDateTime.value = startDateTimeInput.value;
  endDateTime.value = endDateTimeInput.value;
  execute();
}

function onClear() {
  page.value = 1;
  selectedState.value = '';
  startDateTime.value = '';
  endDateTime.value = '';
  execute();
}

</script>

<template>
  <div class="container m-auto text-light-gray w-100 xl:w-1/2">
    <div class="flex flex-wrap items-end gap-2 py-5">
      <LocationSelect v-model="selectedStateOption" data-name="location-select" />
      <InputDate v-model="startDateTimeInput" label="Start date:" data-name="start-date-time-input" />
      <InputDate v-model="endDateTimeInput" label="End date:" data-name="end-date-time-input" />
      <button
        class="rounded bg-white text-dark-blue hover:bg-mid-blue hover:text-white shadow-lg transition-all duration-300 p-2 h-12 w-24"
        data-name="search-btn" @click="onSearch">Search</button>
      <input type="reset"
        class="rounded bg-white text-dark-blue hover:bg-mid-blue hover:text-white shadow-lg transition-all duration-300 p-2 h-12 w-24"
        data-name="reset" @click="onClear" />
    </div>
    <div class="w-100 flex justify-between py-5">
      <div>
        <button v-if="hasPrev && page > 1"
          class="rounded bg-gradient-to-r from-gray-200 to-gray-300 text-dark-blue hover:from-mid-blue hover:to-blue hover:text-white shadow-lg transition-all duration-300 p-2 w-24 md:w-40"
          data-name="prev-btn" @click="onNavPrev">
          Previous
        </button>
      </div>
      <div>
        <button v-if="hasNext"
          class="rounded bg-gradient-to-r from-gray-200 to-gray-300 text-dark-blue hover:from-mid-blue hover:to-blue hover:text-white shadow-lg transition-all duration-300 p-2 w-24 md:w-40"
          :disabled="!hasNext" data-name="next-btn" @click="onNavNext">
          Next
        </button>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <SkeletonEventCard v-if="status === 'pending'" v-for="index in 10" :key="index" />
      <EventCard v-else-if="status === 'success' && data.events.length" v-for="event in data.events" :key="event.id"
        :event="event" />
      <div v-else>Sorry! There are no events.</div>
    </div>
  </div>
</template>