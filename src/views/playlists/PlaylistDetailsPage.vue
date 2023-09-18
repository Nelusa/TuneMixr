<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.username }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button v-if="isLoading" disabled class="btn">Deleting...</button>
      <button
        v-if="ownership && !isLoading"
        @click="handleDeletePlaylist"
        class="btn"
      >
        Delete Playlist
      </button>
    </div>
    <SongList v-if="playlist" :playlist="playlist" :ownership="ownership" />
  </div>
</template>

<script>
import { computed } from "vue";
import getDocument from "../../helpers/getDocument";
import getUser from "../../helpers/getUser";
import useDocument from "../../helpers/useDocument";
import { useRouter } from "vue-router";
import useStorage from "../../helpers/useStorage";
import SongList from "../../components/SongList.vue";

export default {
  props: ["id"],
  setup(props) {
    const { document: playlist, error } = getDocument("playlists", props.id);
    const { user } = getUser();
    const { deleteDoc, isLoading } = useDocument("playlists", props.id);
    const { deleteImage } = useStorage();
    const router = useRouter();

    // Check if the user is the owner of the playlist
    const ownership = computed(() => {
      return (
        playlist.value && user.value && user.value.uid === playlist.value.userId // conditions: playlist exists, user exists, user id matches playlist user id
      );
    });
    console.log(error.value);

    const handleDeletePlaylist = async () => {
      await deleteDoc();
      await deleteImage(playlist.value.filePath);
      router.push({ name: "Home" });
    };
    return {
      playlist,
      error,
      ownership,
      handleDeletePlaylist,
      isLoading,
    };
  },
  components: { SongList },
};
</script>

<style>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
</style>
