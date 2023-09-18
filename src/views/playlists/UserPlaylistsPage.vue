<template>
  <div>
    <h2>My Playlists</h2>
    <div v-if="isLoading">Loading...</div>
    <div v-if="playlists">
      <ListView :playlists="playlists" />
    </div>
    <RouterLink to="/playlists/create" class="btn create-btn"
      >Create a New Playlist</RouterLink
    >
  </div>
</template>

<script>
import getCollection from "../../helpers/getCollection";
import getUser from "../../helpers/getUser";
import { RouterLink } from "vue-router";
import ListView from "../../components/ListView.vue";

export default {
  components: { RouterLink, ListView },
  setup() {
    const { user } = getUser();
    const { documents: playlists } = getCollection("playlists", [
      "userId",
      "==",
      user.value.uid,
    ]);

    console.log(playlists);

    return { playlists };
  },
};
</script>

<style scoped>
h2 {
  padding-bottom: 10px;
  margin-bottom: 30px;
  border-bottom: 1px solid var(--secondary);
}
.btn {
  margin-top: 20px;
}
</style>
