<script setup>
const { event } = defineProps(['event'])
function getImageUrl(images) {
  const image = images.find(i => i.ratio === '16_9') || images[0];
  return image.url;
}

</script>

<template>
  <div class="bg-blue rounded-lg shadow shadow-blue p-5 flex flex-col h-96">
    <div class="flex-grow">
      <h1 class="text-2xl">
        {{ event.name }}
      </h1>
      <h3 class="text-lg">
        {{ event._embedded.venues[0].name }}
      </h3>
      <div class="font-light">
        <NuxtTime :datetime="event.dates.start.localDate" date-style="full" />
      </div>
    </div>
    <div class="w-100 mt-5">
      <img class="object-contain m-auto rounded-lg w-96" :src="getImageUrl(event.images)">
    </div>
  </div>
</template>