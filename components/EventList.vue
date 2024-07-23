<script setup>
import { DateTime } from 'luxon';
import { ref, computed } from 'vue';

function formatStartDateTime(dateString) {
  return DateTime.fromISO(dateString).toUTC().toISO({ includeOffset: false, suppressMilliseconds: true }) + 'Z';
}

function formatEndDateTime(dateString) {
  return DateTime.fromISO(dateString).plus({ days: 1 })
    .startOf('day').toUTC().toISO({ includeOffset: false, suppressMilliseconds: true }) + 'Z';
}

const size = ref(10);
const page = ref(1);
const selectedState = ref('');
const startDateTime = ref('');
const endDateTime = ref('');

const selectedStateOption = ref('');
const startDateTimeInput = ref('');
const endDateTimeInput = ref('');

const params = computed(() => ({
  size: size.value,
  page: page.value,
  stateCode: selectedState.value,
  startDateTime: startDateTime.value ? formatStartDateTime(startDateTime.value) : undefined,
  endDateTime: endDateTime.value ? formatEndDateTime(endDateTime.value) : undefined,
}));

const { data, execute, status } = await useFetch('/api/events', { params });

const hasNext = computed(() => {
  return !!data.value.links?.next?.href;
});

const hasPrev = computed(() => {
  return !!data.value.links?.prev?.href;
});

function onNavNext() {
  page.value++;
  execute();
  window.scrollTo(0, 0);
}

function onNavPrev() {
  if (page.value > 1) {
    page.value--;
  } else {
    page.value = 1;
  }
  execute();
  window.scrollTo(0, 0);
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
  selectedStateOption.value = '';
  startDateTimeInput.value = '';
  endDateTimeInput.value = '';
  selectedState.value = '';
  startDateTime.value = '';
  endDateTime.value = '';
  execute();
}

</script>

<template>
  <div class="container m-auto text-light-gray w-100 xl:w-1/2">
    <div class="flex flex-wrap items-end gap-2 py-5">
      <LocationSelect
        v-model="selectedStateOption"
        data-name="location-select"
      />
      <InputDate
        v-model="startDateTimeInput"
        label="Start date:"
        data-name="start-date-time-input"
      />
      <InputDate
        v-model="endDateTimeInput"
        label="End date:"
        data-name="end-date-time-input"
      />
      <button
        class="rounded bg-white text-dark-blue hover:bg-mid-blue hover:text-white shadow-lg transition-all duration-300 p-2 h-12 w-24"
        data-name="search-btn"
        @click="onSearch"
      >
        Search
      </button>
      <input
        type="reset"
        class="rounded bg-white text-dark-blue hover:bg-mid-blue hover:text-white shadow-lg transition-all duration-300 p-2 h-12 w-24"
        data-name="reset"
        @click="onClear"
      >
    </div>
    <PageControl
      :page="page"
      :has-prev="hasPrev"
      :has-next="hasNext"
      :on-nav-prev="onNavPrev"
      :on-nav-next="onNavNext"
    />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <template v-if="status === 'pending'">
        <SkeletonEventCard
          v-for="index in 10"
          :key="index"
        />
      </template>
      <EventCard
        v-for="event in data.events"
        v-else-if="status === 'success' && data.events.length"
        :key="event.id"
        :event="event"
      />
      <div v-else>
        Sorry! There are no events.
      </div>
    </div>
    <PageControl
      :page="page"
      :has-prev="hasPrev"
      :has-next="hasNext"
      :on-nav-prev="onNavPrev"
      :on-nav-next="onNavNext"
    />
  </div>
</template>