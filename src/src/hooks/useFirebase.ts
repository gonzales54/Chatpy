import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, UserCredential } from "firebase/auth"
import firebaseConfig from "@/config/firebase"

const useFirebase = () => {
  const signInUser = async(email: string, password: string): Promise<UserCredential> => {
    return await signInWithEmailAndPassword(firebaseConfig.auth(), email, password);
  }
  const signUpUser = async(name: string, email: string, password: string): Promise<UserCredential> => {
    const createdUser = await createUserWithEmailAndPassword(firebaseConfig.auth(), email, password);
    await updateProfile(createdUser.user, {
      displayName: name
    });
    return createdUser;
  }
  const googleSignIn = () => {

  }

  return { signInUser, signUpUser, googleSignIn }
}

export default useFirebase;