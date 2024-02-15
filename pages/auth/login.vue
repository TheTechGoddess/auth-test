<template>
  <div class="my-6">
    <Title title="Sign In" />
    <form @submit.prevent="submit" class="flex flex-col mt-20 space-y-5">
      <hr />
      <Input
        type="email"
        name="email"
        v-model="email"
        label="Email"
        placeholder="input your username in here"
        :error="emailError"
        :Required="true"
      />
      <Input
        type="password"
        name="password"
        v-model="password"
        label="Password"
        placeholder="input your password in here"
        :error="passwordError"
        :Required="true"
      />
      <div class="flex justify-between items-center">
        <div>
          <div class="flex items-center mt-2 mb-1">
            <input
              type="checkbox"
              id="agreeCheckbox"
              class="hidden"
              @click="toggleCheckbox"
            />
            <label
              for="agreeCheckbox"
              class="relative cursor-pointer select-none"
            >
              <div
                class="w-4 h-4 border border-primary rounded flex items-center justify-center"
                :class="{
                  'bg-[#E8F0FE]': isChecked,
                  'bg-transparent': !isChecked,
                }"
              >
                <img
                  src="~/assets/images/checked.svg"
                  alt=""
                  v-if="isChecked"
                />
              </div>
            </label>
            <span class="ml-2 text-bodytext text-sm font-light"
              >remember me
            </span>
          </div>
        </div>
        <p class="text-bodytext text-sm font-medium">forgot password?</p>
      </div>
      <div>
        <div class="md:flex flex-row-reverse justify-between items-center mt-6 md:mt-16">
          <p class="ml-2 text-bodytext text-sm font-normal">
            Don't have an account?
            <nuxt-link to="/auth/register">
              <span class="text-primary font-bold leading-tight cursor-pointer">
                Sign up now</span
              ></nuxt-link
            >
          </p>
          <Button type="submit" class="mt-4 md:mt-0">Sign In</Button>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "authsecond",
});
import Title from "~/components/auth/Title.vue";
import { useRuntimeConfig } from "nuxt/app";
const runtimeConfig = useRuntimeConfig();
const url = `${runtimeConfig.public.baseUrl}/login`;

const email = ref("");
const emailError = ref(false);
const password = ref("");
const passwordError = ref(false);
const isChecked = ref(false);

const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const toggleCheckbox = () => {
  isChecked.value = !isChecked.value;
};

const validateFields = () => {
  let isValid = true;
  // Validate Email
  emailError.value = !email.value || !emailPattern.test(email.value);
  isValid = isValid && !emailError.value;

  // Validate Password
  passwordError.value = !password.value;
  isValid = isValid && !passwordError.value;

  // Validate Checkbox
  if (!isChecked.value) {
    isValid = false;
  }

  return isValid;
};

// const nextStep = () => {
//   if (validateFields()) {
//     console.log("submited");
//   }
// };

const submit = async () => {
  if (validateFields()) {
    try {
      const data = {
        email: email.value,
        password: password.value,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("successfully logged in");
      } else {
        const responseData = await response.json();
        alert("there was an issue while logging in");
        throw new Error(
          "Form submission failed with status: " +
            response.status +
            ". Error message: " +
            responseData.error
        );
      }
    } catch (error) {
      alert("there was an issue while logging in");
      console.error("Error submitting form:", error);
    }
  }
};
</script>
