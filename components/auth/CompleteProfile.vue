<template>
  <div>
    <Title
      title="Welcome to Madesoft Academy"
      description="We'd love to know more about"
    />
    <div class="flex flex-col my-5 space-y-5">
      <div class="py-3 flex space-x-5">
        <div
          class="mt-2 w-24 h-24 rounded-lg items-center bg-[#E2E2EA] flex justify-center cursor-pointer"
        >
          <input
            type="file"
            id="logo"
            accept="image/*"
            @change="handleImageUpload"
            class="hidden"
          />
          <label for="logo" class="cursor-pointer">
            <img
              v-if="imagePreview"
              :src="imagePreview"
              alt="Company Logo"
              class="w-24 h-24 rounded-lg"
            />
            <img
              v-else
              src="~/assets/images/greycheck.svg"
              alt="Add Logo"
              class="w-4"
            />
          </label>
        </div>
        <div class="flex flex-col space-y-6 self-end">
          <p class="text-sm text-black font-bold">
            Select your personal profile picture
          </p>
          <div
            class="bg-primary w-[80px] py-2 px-4 rounded-lg text-sm text-white font-medium"
          >
            <input
              type="file"
              id="logo"
              accept="image/*"
              @change="handleImageUpload"
              class="hidden"
            />
            <label for="logo" class="cursor-pointer">
              <p>Browse</p>
            </label>
          </div>
        </div>
      </div>
      <Input
        type="text"
        name="about"
        v-model="about"
        label="About"
        placeholder="Tell us about yourself"
        :error="aboutError"
        :Required="true"
      />
      <Input
        type="text"
        name="specialties"
        v-model="specialties"
        label="Your Specialties"
        placeholder="What are your specialties"
        :error="specialtiesError"
        :Required="true"
      />
      <div>
        <div>
          <Button @click="nextStep">Next</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Title from "./Title.vue";
import Input from "~/components/global/Input.vue";
import Button from "~/components/global/Button.vue";
import { useStepsStore } from "@/store/steps";

const stepsStore = useStepsStore();
const image = ref(null);
const imagePreview = ref(null);

const nextStep = () => {
  stepsStore.increment();
  console.log({ current: stepsStore.count });
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];

  if (file) {
    // Check if the selected file is an image
    if (file.type.startsWith("image/")) {
      // Set the selected logo to the companyLogo variable
      image.value = file;

      // Read the file and set the logoPreview to show a preview
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.value = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      // Display an error message or reset the input
      alert("Please select an image file.");
      event.target.value = null; // Reset the input
    }
  }
};
</script>
