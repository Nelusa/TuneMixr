<template>
  <div class="add-song">
    <button v-if="!showForm" @click="handleToggleForm">Add Songs</button>
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <h4>Add a New Song</h4>
      <input type="text" placeholder="Song Title" required v-model="title" />
      <input type="text" placeholder="Artist" required v-model="artist" />
      <button>Add</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import useDocument from "../helpers/useDocument";

export default {
  props: ["playlist"],
  setup(props) {
    const { updateDoc } = useDocument("playlists", props.playlist.id);

    const title = ref("");
    const artist = ref("");
    const showForm = ref(false);

    const handleToggleForm = () => {
      showForm.value = !showForm.value;
    };

    const handleSubmit = async () => {
      const newSong = {
        title: title.value,
        artist: artist.value,
        id: uuidv4(),
      };

      // Add the song to the playlist
      await updateDoc({
        songs: [...props.playlist.songs, newSong],
      });

      title.value = "";
      artist.value = "";
      showForm.value = false;
    };

    return { title, artist, showForm, handleToggleForm, handleSubmit };
  },
};
</script>

<style scoped>
.add-song {
  text-align: center;
  margin-top: 40px;
}
form {
  max-width: 100%;
  text-align: left;
}
</style>
