import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, User, UserCredential } from "firebase/auth"
import firebaseConfig from "@/config/firebase"

const useFirebase = () => {
  const google = new GoogleAuthProvider();
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

  const signOutUser = (): void => {
    signOut(firebaseConfig.auth());
  }

  const googleAuthentication = async(): Promise<UserCredential> => {
    const user = await signInWithPopup(firebaseConfig.auth(), google);
    return user;
  }

  return { signInUser, signUpUser, signOutUser, googleAuthentication }
}

export default useFirebase;