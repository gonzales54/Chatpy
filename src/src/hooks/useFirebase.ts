import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, UserCredential } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore";
import firebaseConfig from "@/config/firebase"

const useFirebase = () => {
  const google = new GoogleAuthProvider();
  const signInUser = async(email: string, password: string): Promise<UserCredential> => {
    return await signInWithEmailAndPassword(firebaseConfig.auth(), email, password);
  }

  const signUpUser = async(name: string, email: string, password: string): Promise<UserCredential> => {
    const user = await createUserWithEmailAndPassword(firebaseConfig.auth(), email, password);
    const userDoc = await getDoc(doc(firebaseConfig.db(), "users", user.user.uid));
    await updateProfile(user.user, {
      displayName: name
    });

    if(!userDoc.exists()) {
      await setDoc(doc(firebaseConfig.db(), "users", user.user.uid), {
        username: user.user.displayName,
        email: user.user.email
      });   
    }
    
    return user;
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
        email: user.user.email
      });      
    }
    return user;
  }


  return { signInUser, signUpUser, signOutUser, googleAuthentication }
}

export default useFirebase;