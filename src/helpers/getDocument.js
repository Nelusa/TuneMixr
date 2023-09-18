import { ref, watchEffect } from "vue";
import { projectFirestore } from "../firebase/config";

const getDocument = (collection, id) => {
  const document = ref(null);
  const error = ref(null);

  // register the firestore collection reference
  let documentRef = projectFirestore.collection(collection).doc(id);

  const unsub = documentRef.onSnapshot(
    (doc) => {
      if (doc.data()) {
        document.value = { ...doc.data(), id: doc.id }; //this will give us the data of the document and also the id of the document
        error.value = null;
      } else {
        error.value = "That document does not exist";
      }
    },
    (err) => {
      console.log(err.message);
      error.value = "could not fetch the document";
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { document, error };
};

export default getDocument;
