<template>
  <div class="my-6">
    <Title title="Sign In" />
    <form @submit.prevent="nextStep" class="flex flex-col mt-20 space-y-5">
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
        <div class="flex justify-between items-center mt-16">
          <Button type="submit">Sign In</Button>
          <p class="ml-2 text-bodytext text-sm font-normal">
            Don't have an account?
            <nuxt-link to="/auth/register">
              <span class="text-primary font-bold leading-tight cursor-pointer">
                Sign up now</span
              ></nuxt-link
            >
          </p>
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

const nextStep = () => {
  if (validateFields()) {
    console.log("submited");
  }
};

// const submit = async () => {
//   if (validateFields()) {
//     try {
//       const data = {
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
</script>
