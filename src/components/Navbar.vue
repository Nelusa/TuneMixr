<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="navbar">
    <nav>
      <RouterLink to="/" class="logo"
        ><img src="@/assets/ninja.png" alt="Muso Ninja Logo" />
        <h1>TuneMixr</h1></RouterLink
      >
      <ul class="links">
        <li v-if="user">
          <RouterLink to="/playlists/user" class="btn colored-btn"
            >My Playlists</RouterLink
          >
        </li>
        <li v-if="user">
          <RouterLink to="/playlists/create" class="btn create-btn"
            >Create Playlist</RouterLink
          >
        </li>

        <li v-if="user">
          <button
            v-if="!isLoading"
            @click="handleSubmit"
            type="button"
            class="btn logout-btn"
          >
            <ArrowRightOnRectangleIcon class="icon" />
          </button>
          <button v-if="isLoading" disabled>Logging out...</button>
        </li>
        <li v-if="!user">
          <RouterLink to="/login" class="btn">Login</RouterLink>
        </li>
        <li v-if="!user">
          <RouterLink to="/signup" class="btn">Sign up</RouterLink>
        </li>
        <span v-if="user">Hi there, {{ user.displayName }}!</span>
      </ul>
    </nav>

    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script>
import { RouterLink, useRouter } from "vue-router";
import useLogout from "../helpers/useLogout";
import getUser from "../helpers/getUser";
import { ArrowRightOnRectangleIcon } from "@heroicons/vue/24/solid";

export default {
  components: {
    RouterLink,
    ArrowRightOnRectangleIcon,
  },
  setup() {
    const { logout, error, isLoading } = useLogout();
    const { user } = getUser();
    const router = useRouter();

    console.log(user);

    const handleSubmit = async () => {
      await logout();

      if (!error.value) {
        console.log("Logout successful");
        router.push({ name: "Login" });
      }
    };

    return {
      handleSubmit,
      error,
      isLoading,
      user,
    };
  },
};
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}
nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav img {
  max-height: 60px;
}
nav h1 {
  margin-left: 20px;
}
nav .links {
  display: flex;
  margin-left: auto;
  align-items: center;
  position: relative;
}
nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
}

.logo {
  display: flex;
  align-items: center;
}

nav .links button {
  margin-top: 0;
}

li {
  list-style: none;
}

span {
  font-size: 20px;
  position: absolute;
  right: 10px;
  top: 70px;
  color: var(--colored);
  font-weight: 700;
}

.logout-btn {
  display: flex;
  align-items: center;
  padding: 0;
}

.icon {
  width: 15px;
  height: auto;
  align-items: center;
  padding: 10px;
}

.icon:hover {
  fill: #fff;
}
</style>
