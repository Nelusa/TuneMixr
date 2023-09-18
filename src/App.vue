<template>
  <Navbar />
  <div class="content">
    <RouterView />
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";

export default {
  components: {
    RouterView,
    Navbar,
  },
};
</script>

<style>
.content {
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;
}
</style>
