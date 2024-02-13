<template>
  <div class="w-full">
    <div class="">
      <label class="text-header text-sm font-medium">
        {{ label }}
        <span v-if="isRequired" class="text-error">*</span>
      </label>
    </div>
    <div class="field">
      <p class="">
        <VField :name="name" v-slot="{ field, meta, errors }">
          <textarea
            v-bind="field"
            @focus="onInputFocus"
            @blur="onInputBlur"
            @input="$emit('update:modelValue', $event.target.value)"
            class="border rounded-lg py-3 px-4 outline-none text-sm font-light lg:font-normal placeholder-[#BCBCBF] w-full text-[#333] mt-2"
            :class="inputClasses"
            :placeholder="placeholder"
            :type="type"
            cols="30"
            rows="5"
          ></textarea>
          <VErrorMessage :name="name" as="div"  />
        </VField>
      </p>
    </div>
  </div>
</template>

<script setup>
const isFocused = ref(false);

function onInputFocus() {
  isFocused.value = true;
}

function onInputBlur() {
  isFocused.value = false;
}

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  name: {
    type: String,
    required: true,
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
  isRequired: {
    type: Boolean,
    default: false,
  },
});

const inputClasses = ref([
  {
    "border-red-500": props.error,
    "border-gray-300": !props.error && !isFocused,
    "border-primary": isFocused,
  },
]);
</script>

<style></style>
