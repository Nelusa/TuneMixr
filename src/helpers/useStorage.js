import { projectStorage } from "../firebase/config";
import { ref } from "vue";
import getUser from "./getUser";

const { user } = getUser();

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);

  const uploadImage = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`; //this is the path to the file in the storage bucket (covers/userId/filename)
    const storageRef = projectStorage.ref(filePath.value); //this is the reference to the file in the storage bucket

    try {
      const res = await storageRef.put(file); //this uploads the file to the storage bucket
      url.value = await res.ref.getDownloadURL(); //this is the url to the file in the storage bucket
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  const deleteImage = async (path) => {
    const storageRef = projectStorage.ref(path);

    try {
      await storageRef.delete();
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  return { url, filePath, error, uploadImage, deleteImage };
};

export default useStorage;
