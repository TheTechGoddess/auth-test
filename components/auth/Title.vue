<template>
  <div>
    <h1 class="text-2xl font-bold text-header">
      {{ title }}
    </h1>
    <p class="mt-2 text-[#92929D]">{{ description }}</p>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>
