<template>
  <div>
    <form @submit.prevent="nextStep" class="flex flex-col my-5 space-y-5">
      <div class="w-full lg:flex lg:space-x-3">
        <div class="lg:w-[50%]">
          <Input
            type="text"
            name="fullname"
            v-model="fullname"
            label="Full Name"
            placeholder="input your full name in here"
            :error="fullnameError"
            :required="true"
          />
        </div>
        <div class="lg:w-[50%] mt-4 lg:mt-0">
          <Input
            type="text"
            name="Username"
            v-model="username"
            label="Username"
            placeholder="input your username in here"
            :error="usernameError"
            :required="true"
          />
        </div>
      </div>
      <Input
        type="email"
        name="email"
        v-model="email"
        label="Email"
        placeholder="input your username in here"
        :error="emailError"
        :required="true"
      />
      <Input
        type="password"
        name="password"
        v-model="password"
        label="Password"
        placeholder="input your password in here"
        :error="passwordError"
        :required="true"
      />
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
              <img src="~/assets/images/checked.svg" alt="" v-if="isChecked" />
            </div>
          </label>
          <span class="ml-2 text-bodytext text-sm font-light"
            >I have read and agree to the Terms of Service
          </span>
        </div>
        <div>
          <div class="flex justify-between items-center mt-10">
            <Button type="submit">Create Account</Button>
            <p class="ml-2 text-bodytext text-sm font-normal">
              Already have an account?
              <nuxt-link to="/auth/login">
                <span
                  class="text-primary font-bold leading-tight cursor-pointer"
                >
                  Sign in now</span
                ></nuxt-link
              >
            </p>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup>
import Input from "~/components/global/Input.vue";
import Button from "~/components/global/Button.vue";
import { useStepsStore } from "@/store/steps";
import { useRuntimeConfig } from "nuxt/app";
const runtimeConfig = useRuntimeConfig();
const url = `${runtimeConfig.public.baseUrl}/register`;

const stepsStore = useStepsStore();
const fullname = ref("");
const fullnameError = ref(false);
const username = ref("");
const usernameError = ref(false);
const email = ref("");
const emailError = ref(false);
const password = ref("");
const passwordError = ref(false);
const isChecked = ref(false);

const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const toggleCheckbox = () => {
  isChecked.value = !isChecked.value;
};

// Inside the validateFields function

const validateFields = () => {
  let isValid = true;

  // Validate Full Name
  fullnameError.value = !fullname.value;
  isValid = isValid && !fullnameError.value;

  // Validate Username
  usernameError.value = !username.value;
  isValid = isValid && !usernameError.value;

  // Validate Email
  emailError.value = !email.value || !emailPattern.test(email.value);
  isValid = isValid && !emailError.value;

  // Validate Password
  if (!password.value) {
    passwordError.value = "Password is required";
    isValid = false;
  } else if (password.value.length < 8) {
    passwordError.value = "Your password must contain at least 8 characters";
    isValid = false;
  } else if (!/[\W_]/.test(password.value)) {
    passwordError.value =
      "Your password must contain at least one special character";
    isValid = false;
  } else if (!/[a-z]/.test(password.value)) {
    passwordError.value =
      "Your password must contain at least one lowercase letter";
    isValid = false;
  } else if (!/[A-Z]/.test(password.value)) {
    passwordError.value =
      "Your password must contain at least one uppercase letter";
    isValid = false;
  } else if (!/\d/.test(password.value)) {
    passwordError.value = "Your password must contain at least one number";
    isValid = false;
  } else {
    passwordError.value = "";
  }

  // Validate Checkbox
  if (!isChecked.value) {
    isValid = false;
  }

  return isValid;
};

// const submit = async () => {
//   if (validateFields()) {
//     try {
//       const data = {
//         first_name: fullname.value,
//         last_name: username.value,
//         email: email.value,
//         password: password.value,
//       };

//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         console.log("success");
//         // stepsStore.increment();
//       } else {
//         const responseData = await response.json();
//         throw new Error(
//           "Form submission failed with status: " +
//             response.status +
//             ". Error message: " +
//             responseData.error
//         );
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   }
// };

const nextStep = () => {
  if (validateFields()) {
    stepsStore.increment();
    console.log({ current: stepsStore.count });
  }
};
</script>
