<script setup>
const { hasPrev, hasNext } = defineProps({
  page: { type: Number, default: 1 },
  hasPrev: { type: Boolean },
  hasNext: { type: Boolean },
  onNavPrev: { type: Function, required: true },
  onNavNext: { type: Function, required: true }
});
</script>

<template>
  <div class="w-100 flex justify-between py-5">
    <div>
      <button
        v-if="hasPrev && page > 1"
        class="bg-transparent text-white hover:text-soft-blue hover:underline font-medium text-lg px-1 py-0 transition-all duration-300"
        data-name="prev-btn"
        @click="onNavPrev"
      >
        Previous
      </button>
    </div>
    <div>
      <button
        v-if="hasNext"
        class="bg-transparent text-white hover:text-soft-blue hover:underline font-medium text-lg px-1 py-0 transition-all duration-300"
        :disabled="!hasNext"
        data-name="next-btn"
        @click="onNavNext"
      >
        Next
      </button>
    </div>
  </div>
</template>