<!-- layouts/auth.vue -->
<template>
  <div class="flex w-full justify-between">
    <div class="hidden lg:w-[45%] lg:flex">
      <LayoutAuthSidebar />
    </div>
    <div class="w-full lg:w-[55%] py-8 px-20"><slot></slot></div>
  </div>
</template>
