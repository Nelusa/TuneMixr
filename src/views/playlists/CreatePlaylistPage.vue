<template>
  <form @submit.prevent="handleSubmit">
    <input
      type="text"
      required
      placeholder="Playlist Title"
      name="title"
      id="title"
      v-model="title"
    />
    <textarea
      name="description"
      id="description"
      placeholder="Playlist Description"
      v-model="description"
    ></textarea>

    <label for="cover">Upload playlist cover image</label>

    <input
      type="file"
      name="cover"
      id="cover"
      :accept="types"
      @change="handleCoverChange"
    />
    <div class="error" v-if="fileError">{{ fileError }}</div>
    <div class="error"></div>
    <button v-if="isPending" type="submit" disabled="isPending">
      Creating...
    </button>
    <button v-if="!isPending" type="submit">Create Playlist</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useStorage from "../../helpers/useStorage";
import useCollection from "../../helpers/useCollection";
import getUser from "../../helpers/getUser";
import { timestamp } from "../../firebase/config";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { url, filePath, uploadImage } = useStorage();
    const { error, addDoc } = useCollection("playlists");
    const { user } = getUser();

    const router = useRouter();

    const title = ref("");
    const description = ref("");
    const file = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);

    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true;
        await uploadImage(file.value);
        const res = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          username: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          songs: [],
          createdAt: timestamp(),
        });
        isPending.value = false;

        if (!error.value) {
          console.log("Playlist created successfully");
          router.push({ name: "PlaylistDetails", params: { id: res.id } });
        }
      }

      //reset form
      title.value = "";
      description.value = "";
      file.value = null;
    };

    //allowed file types
    const types = ["image/png", "image/jpeg", "image/jpg"];

    const handleCoverChange = (e) => {
      const selectedFile = e.target.files[0];

      if (selectedFile && types.includes(selectedFile.type)) {
        file.value = selectedFile;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Please select an image file (png or jpg/jpeg)";
      }
    };

    return {
      title,
      description,
      handleSubmit,
      handleCoverChange,
      types,
      file,
      fileError,
      error,
      isPending,
    };
  },
};
</script>

<style>
form {
  background: white;
}
input[type="file"] {
  border: 0;
  padding: 0;
}
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
button {
  margin-top: 20px;
}
</style>
