<template>
  <div>
    <h1
      class="text-header font-bold text-4xl w-[400px]"
      v-if="currentStep === 0"
    >
      Sign up to Madesoft Academy of Technology
    </h1>
    <LayoutProgressBar :data="data" class="self-start" />
    <div>
      <AuthSignUp v-if="currentStep === 0" />
      <AuthCompleteProfile v-if="currentStep === 1" />
      <AuthWelcome v-if="currentStep === 2" />
    </div>
  </div>
</template>
<script setup>
import { useStepsStore } from "@/store/steps.ts";
import { ref, computed, watch } from "vue";

definePageMeta({
  layout: "authsecond",
});

const data = {
  steps: ["Signup", "Complete Profile", "Welcome"],
  currentStep: 0,
};

watch(data, (newValue, oldValue) => {
  console.log("changed:", newValue);
  // fetchStates();
});

console.log(1, data);

const stepsStore = useStepsStore();
const currentStep = computed(() => stepsStore.count);
</script>
