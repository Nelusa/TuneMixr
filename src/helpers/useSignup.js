import { ref } from "vue";
import { projectAuth } from "../firebase/config";

const error = ref(null);
const isLoading = ref(false);

const signup = async (email, password, displayName) => {
  error.value = null;
  isLoading.value = true;

  try {
    const res = await projectAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    if (!res) {
      throw new Error("Could not complete signup");
    }
    await res.user.updateProfile({ displayName });
    error.value = null;
    isLoading.value = false;

    return res;
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
    isLoading.value = false;
  }
};

const useSignup = () => {
  return { error, signup };
};

export default useSignup;
