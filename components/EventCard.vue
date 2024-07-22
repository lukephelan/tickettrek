<script setup>
import { computed } from 'vue';

const { event } = defineProps(['event'])

function getImageUrl(images) {
  const image = images.find(i => i.ratio === '16_9') || images[0];
  return image.url;
}

const timezone = computed(() => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return timeZone;
})

</script>

<template>
  <div class="bg-blue rounded-lg shadow shadow-blue p-5 flex flex-col h-96">
    <div class="flex-grow">
      <h1 class="text-2xl pb-2">
        {{ event.name }}
      </h1>
      <h3 class="text-lg">
        {{ event._embedded?.venues[0].name }}
      </h3>
      <div class="font-light">
        <NuxtTime v-if="event.dates.start.dateTime" :datetime="event.dates.start.dateTime" time-style='short'
          date-style="full" :timezone="timezone" />
        <NuxtTime v-else-if="event.dates.start.localDate" :datetime="event.dates.start.localDate" date-style="full"
          :timezone="timezone" />
      </div>
    </div>
    <div class="w-100 mt-5">
      <img class="object-contain m-auto rounded-lg w-96" :src="getImageUrl(event.images)">
    </div>
  </div>
</template>