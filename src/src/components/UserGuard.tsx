import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import authUser from "@/store/authUser";
import { ReactElement, ReactNode, useEffect } from "react";
import { onAuthStateChanged, User, UserCredential } from "firebase/auth";
import firebaseConfig from "@/config/firebase";

const UserGuard = ({children} : {children: ReactNode | ReactNode[]}) => {
  const [user, setUser] = useRecoilState(authUser);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(firebaseConfig.auth(), (currentUser: User | null) => {
      if(!currentUser && router.pathname !== '/') {
        router.push('/');
      }
      setUser(JSON.parse(JSON.stringify(currentUser)));
    })
  }, []);

  if(!user) {
    return null;
  }

  return (
    <>{children}</>
  )
}

export default UserGuard;