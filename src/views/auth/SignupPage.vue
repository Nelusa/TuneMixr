<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <input type="text" placeholder="Display name" v-model="displayName" />
    <input
      type="email"
      placeholder="E-mail"
      v-model="email"
      autocomplete="email"
    />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isLoading" type="submit">Sign up</button>
    <button v-if="isLoading" disabled>Loading...</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useSignup from "../../helpers/useSignup";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { signup, error, isLoading } = useSignup();

    const router = useRouter();

    const displayName = ref("");
    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, displayName.value);

      if (!error.value) {
        console.log("Sign up successful", res);
        router.push({ name: "Home" });
      }

      displayName.value = "";
      email.value = "";
      password.value = "";
    };

    return { handleSubmit, email, password, error, displayName, isLoading };
  },
};
</script>

<style lang="scss" scoped></style>
