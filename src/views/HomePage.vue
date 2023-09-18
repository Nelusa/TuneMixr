<template>
  <main>
    <h1>Playlists</h1>
    <p v-if="error">No playlists to show</p>
    <div v-else>
      <ListView :playlists="documents" />
    </div>
  </main>
</template>

<script>
import ListView from "../components/ListView.vue";
import getCollection from "../helpers/getCollection";
import { RouterLink } from "vue-router";

export default {
  components: {
    RouterLink,
    ListView,
  },
  setup() {
    const { documents, error } = getCollection("playlists");

    return {
      documents,
      error,
    };
  },
};
</script>
