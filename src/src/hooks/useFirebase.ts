import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, UserCredential } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore";
import firebaseConfig from "@/config/firebase"
import { ref } from "firebase/storage";

const useFirebase = () => {
  const google = new GoogleAuthProvider();
  const signInUser = async(email: string, password: string): Promise<UserCredential |  undefined> => {
    try {
      return await signInWithEmailAndPassword(firebaseConfig.auth(), email, password);
    } catch(e) {
      if(e instanceof Error) {
        const errorMessage = e.message.split("auth/")[1].replace(/\)/, '');
        console.log(errorMessage)
      }
    }
  }

  const signUpUser = async(name: string, email: string, password: string): Promise<UserCredential | undefined> => {
    const photoRef = ref(firebaseConfig.storage(), "user.svg");
    try {
      const user = await createUserWithEmailAndPassword(firebaseConfig.auth(), email, password);
      const userDoc = await getDoc(doc(firebaseConfig.db(), "users", user.user.uid));
      await updateProfile(user.user, {
        displayName: name
      });

      if(!userDoc.exists()) {
        await setDoc(doc(firebaseConfig.db(), "users", user.user.uid), {
          username: user.user.displayName,
          email: user.user.email,
          photoURL: photoRef.fullPath
        });   
      }
      
      return user;
    } catch(e) {
      if(e instanceof Error) {
        const errorMessage = e.message.split("auth/")[1].replace(/\)/, '');
        console.log(errorMessage)
      }
    }
  }

  const signOutUser = (): void => {
    signOut(firebaseConfig.auth());
  }

  const googleAuthentication = async(): Promise<UserCredential> => {
    const user = await signInWithPopup(firebaseConfig.auth(), google);
    const userDoc = await getDoc(doc(firebaseConfig.db(), "users", user.user.uid));

    if(!userDoc.exists()) {
      await setDoc(doc(firebaseConfig.db(), "users", user.user.uid), {
        username: user.user.displayName,
        email: user.user.email,
        photoURL: user.user.photoURL
      });      
    }
    return user;
  }

  const getPhotoFromStorage = (fileName: string) => {
    const photoRef = ref(firebaseConfig.storage(), fileName);
    return photoRef;
  }

  return { signInUser, signUpUser, signOutUser, googleAuthentication, getPhotoFromStorage }
}

export default useFirebase;