<template>
  <div
    class="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  >
    <div
      class="bg-white text-black flex flex-col px-6 py-4 rounded-2xl max-h-[450px] overflow-y-auto hide-scrollbar"
    >
      <img
        src="~assets/images/close.svg"
        alt=""
        @click="$emit('close')"
        class="self-end mb-3 cursor-pointer"
      />
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
<style>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
