import { ref } from "vue";
import { projectAuth } from "../firebase/config";

const error = ref(null);
const isLoading = ref(false);

const login = async (email, password) => {
  error.value = null;
  isLoading.value = true;

  try {
    const res = await projectAuth.signInWithEmailAndPassword(email, password);
    error.value = null;
    isLoading.value = false;
    return res;
  } catch (err) {
    console.log(err.message);
    error.value = "Incorrect login credentials";
    isLoading.value = false;
  }
};

const useLogin = () => {
  return { error, login, isLoading };
};

export default useLogin;
