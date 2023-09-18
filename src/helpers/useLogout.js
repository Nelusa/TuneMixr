import { ref } from "vue";
import { projectAuth } from "../firebase/config";

// refs
const error = ref(null);
const isLoading = ref(false);

// logout function
const logout = async () => {
  error.value = null;
  isLoading.value = true;

  try {
    await projectAuth.signOut();
    isLoading.value = false;
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
    isLoading.value = false;
  }
};

const useLogout = () => {
  return { error, logout, isLoading };
};

export default useLogout;
