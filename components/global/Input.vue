<template>
  <div class="input-wrapper">
    <label class="text-header font-bold px-3" :for="props.name">{{
      props.label
    }}</label>
    <div class="relative">
      <input
        class="border rounded-lg py-3 px-4 outline-none text-sm placeholder-bodytext w-full text-black mt-2"
        :type="inputType"
        :name="props.name"
        :value="props.modelValue"
        :placeholder="props.placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="{
          'border-primary': !customError,
          'border-red-500': customError,
        }"
      />
      <button
        v-if="props.type === 'password'"
        @click="togglePasswordVisibility"
        class="absolute inset-y-0 right-0 px-3 flex items-center"
      >
        <img
          v-if="inputType === 'password'"
          src="~/assets/images/eye.svg"
          alt=""
          class="w-6 mt-1"
        />
        <img v-else src="~/assets/images/closedeye.svg" alt="" class="w-6 mt-1" />
      </button>
    </div>
    <span v-if="customError" class="text-red-500 text-xs mt-2">{{
      customError
    }}</span>
    <span v-else-if="props.error" class="text-red-500 text-xs mt-2"
      >Please enter {{ props.label }}</span
    >
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  error: {
    type: Boolean,
    default: false,
  },
  customError: String, // Accept custom error message
});

const inputType = ref(props.type);

const togglePasswordVisibility = () => {
  inputType.value = inputType.value === "password" ? "text" : "password";
};
</script>
