<template>
  <div
    :class="backgroundClasses[currentIndex]"
    class="h-screen w-[45%] text-white fixed "
  ></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const backgroundClasses = ref([
  'bg-[url(~/assets/images/signup.svg)]',
  'bg-[url(~/assets/images/signin.svg)]',
]);

let currentIndex = ref(0);

onMounted(() => {
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % backgroundClasses.value.length;
  }, 6000);
});
</script>
