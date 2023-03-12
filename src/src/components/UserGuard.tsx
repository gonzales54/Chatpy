import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useRecoilState } from "recoil";
import firebaseConfig from "@/config/firebase";
import authUser from "@/store/authUser";

const UserGuard = ({children} : {children: ReactNode | ReactNode[]}) => {
  const [user, setUser] = useRecoilState(authUser);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(firebaseConfig.auth(), (currentUser: User | null) => {
      console.log(currentUser)
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