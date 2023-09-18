<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input
      type="email"
      placeholder="E-mail"
      v-model="email"
      autocomplete="email"
    />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isLoading" type="submit">Login</button>
    <button v-if="isLoading" disabled>Loading...</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useLogin from "../../helpers/useLogin";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { login, error, isLoading } = useLogin();

    const router = useRouter();

    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      const res = await login(email.value, password.value);

      if (!error.value) {
        console.log("Login successful", res);
        router.push({ name: "UserPlaylists" });
      }

      email.value = "";
      password.value = "";
    };

    return { handleSubmit, email, password, error, isLoading };
  },
};
</script>

<style lang="scss" scoped></style>
