<template>
  <div class="song-list">
    <div v-if="!playlist.songs.length">
      No songs have been added to this playlist yet!
    </div>

    <div class="single-song" v-for="song in playlist.songs" :key="song.id">
      <div class="details">
        <h3>{{ song.title }}</h3>
        <p>{{ song.artist }}</p>
      </div>
      <button @click="handleDeleteSong(song.id)" v-if="ownership">
        Delete
      </button>
    </div>

    <AddSong v-if="ownership" :playlist="playlist" />
  </div>
</template>

<script>
import AddSong from "./AddSong.vue";
import useDocument from "../helpers/useDocument";

export default {
  props: ["playlist", "ownership"],
  components: { AddSong },
  setup(props) {
    const { updateDoc } = useDocument("playlists", props.playlist.id);

    const handleDeleteSong = async (id) => {
      await updateDoc({
        songs: props.playlist.songs.filter((song) => song.id !== id),
      });

      console.log(id);
    };

    return { handleDeleteSong };
  },
};
</script>

<style scoped>
.single-song {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}
</style>
