import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import firebaseConfig from "@/config/firebase";

const useFirebase = () => {
  const google = new GoogleAuthProvider();
  const signInUser = async (
    email: string,
    password: string
  ): Promise<UserCredential | undefined> => {
    try {
      return await signInWithEmailAndPassword(
        firebaseConfig.auth(),
        email,
        password
      );
    } catch (e) {
      if (e instanceof Error) {
        const errorMessage = e.message.split("auth/")[1].replace(/\)/, "");
        console.log(errorMessage);
      }
    }
  };

  const signUpUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<UserCredential | undefined> => {
    try {
      const user = await createUserWithEmailAndPassword(
        firebaseConfig.auth(),
        email,
        password
      );
      const userDoc = await getDoc(
        doc(firebaseConfig.db(), "users", user.user.uid)
      );
      const getPhotoURL = async (path: string) => {
        const photoRef = ref(firebaseConfig.storage(), path);
        const url = await getDownloadURL(photoRef);
        return url;
      };
      await updateProfile(user.user, {
        displayName: name,
        photoURL: await getPhotoURL("user.svg"),
      });

      if (!userDoc.exists()) {
        await setDoc(doc(firebaseConfig.db(), "users", user.user.uid), {
          username: user.user.displayName,
          email: user.user.email,
        });
      }

      return user;
    } catch (e) {
      if (e instanceof Error) {
        const errorMessage = e.message.split("auth/")[1].replace(/\)/, "");
        console.log(errorMessage);
      }
    }
  };

  const signOutUser = (): void => {
    signOut(firebaseConfig.auth());
  };

  const googleAuthentication = async (): Promise<UserCredential> => {
    const user = await signInWithPopup(firebaseConfig.auth(), google);
    const userDoc = await getDoc(
      doc(firebaseConfig.db(), "users", user.user.uid)
    );

    if (!userDoc.exists()) {
      await setDoc(doc(firebaseConfig.db(), "users", user.user.uid), {
        username: user.user.displayName,
        email: user.user.email,
        photoURL: user.user.photoURL,
      });
    }
    return user;
  };

  const getPhotoFromStorage = (fileName: string) => {
    const photoRef = ref(firebaseConfig.storage(), fileName);
    return photoRef;
  };

  return {
    signInUser,
    signUpUser,
    signOutUser,
    googleAuthentication,
    getPhotoFromStorage,
  };
};

export default useFirebase;
