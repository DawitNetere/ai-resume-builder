import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { storage, db } from "../config/firebase";

export const uploadProfilePicture = async (user, file) => {
  const photoRef = ref(storage, `users/${user.uid}/images/${file.name}`);
  const snapshot = await uploadBytes(photoRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

export const updateUserDoc = async (user, data) => {
  const userDoc = doc(db, "users", user.uid);

  const filteredData = Object.fromEntries(
    Object.entries(data).filter(
      ([_, value]) => value !== null && value !== undefined && value !== ""
    )
  );

  if (Object.keys(filteredData).length > 0) {
    await setDoc(userDoc, filteredData, { merge: true });
  }
};
