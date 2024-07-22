<script setup>
import { ref, computed } from 'vue'

const size = ref(10);
const page = ref(1);

const params = computed(() => ({
  size: size.value,
  page: page.value
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
</script>

<template>
  <div class="container m-auto text-light-gray w-100 xl:w-1/2">
    <div class="w-100 flex justify-between py-5">
      <div>
        <button v-if="hasPrev && page > 1"
          class="rounded bg-light-gray text-dark-blue p-2 w-24 md:w-40 hover:bg-torquoise shadow" data-name="prev-btn"
          @click="onNavPrev">
          <span class="text-2xl">&#8249;</span> Previous
        </button>
      </div>
      <div>
        <button v-if="hasNext" class="rounded bg-light-gray text-dark-blue p-2 w-24 md:w-40 hover:bg-torquoise shadow"
          :disabled="!hasNext" data-name="next-btn" @click="onNavNext">
          Next <span class="text-2xl">&#8250;</span>
        </button>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <SkeletonEventCard v-if="status === 'pending'" v-for="index in 10" :key="index" />
      <EventCard v-else v-for="event in data.events" :key="event.id" :event="event" />
    </div>
  </div>
</template>