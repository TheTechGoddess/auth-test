<template>
  <div class="h-[100px] w-full flex flex-col justify-center">
    <div class="mt-3 flex justify-start">
      <div v-for="(step, index) in data.steps" :key="index" class="flex">
        <div
          class="flex flex-col justify-start text-start w-[100px] self-start"
        >
          <div
            class="w-6 h-6 flex justify-center content-center items-center text-center"
            :class="{
              'bg-white border-[3px] border-primary rounded-full': true,
            }"
          >
            <div
              class="w-3 h-3"
              :class="{
                'bg-white': index > currentStep,
                'bg-primary': index <= currentStep,
                'rounded-full': true,
              }"
            ></div>
          </div>
        </div>
        <hr
          v-if="index < data.steps.length - 1"
          :class="{
            'border-[#D2D2D4]': index >= currentStep,
            'border-primary': index < currentStep,
          }"
          class="mt-2.5 w-[65px] border-2 -ml-[76px]"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStepsStore } from "@/store/steps.ts";

import { ref, computed } from "vue";
const stepsStore = useStepsStore();

const hrClass = (index) => {
  if (index === 0) {
    return "w-[65px]  border-[#D2D2D4] border-2 -ml-[76px]";
  } else if (index === 1) {
    return "w-[65px]  border-[#D2D2D4] border-2 -ml-[76px]";
  } else if (index === 2) {
    return "w-[65px]  border-[#D2D2D4] border-2 -ml-[76px]";
  }
  return "";
};

const props = defineProps({
  data: Object,
});

const data = ref(props.data);
const currentStep = computed(() => stepsStore.count);
console.log(currentStep, 8);
</script>
