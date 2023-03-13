import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useRecoilState } from "recoil";
import firebaseConfig from "@/config/firebase";
import authUser from "@/store/authUser";

const UserGuard = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const [user, setUser] = useRecoilState(authUser);
  const router = useRouter();
  const origin =
  /*typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';*/

  useEffect(() => {
    let isRunUseEffectTwice = false;

    if(!isRunUseEffectTwice) {
      onAuthStateChanged(firebaseConfig.auth(), (currentUser: User | null) => {
        if (!currentUser && router.pathname !== "/") {
          router.push("/");
        }
        setUser(JSON.parse(JSON.stringify(currentUser)));
      });      
    }

    return () => {
      isRunUseEffectTwice = true;
    }
  }, []);

  if (!user) {
    return null;
  }
  
  if(!router.asPath.match(new RegExp(encodeURI(user.displayName!)))) {
    router.back();
  }

  return <>{children}</>;
};

export default UserGuard;
