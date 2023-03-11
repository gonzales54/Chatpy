import authUser from "@/store/authUser";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useRecoilValue } from "recoil";

const UserGuard = ({ children } : {children: ReactNode | ReactNode[]}) => {
  const user = useRecoilValue(authUser);
  const router = useRouter();

  if(user === null && router.pathname !== '/') {
    router.push('/signin');
    return null;
  }

  if(!user) {
    return null;
  }

  return (
    <>{children}</>
  )

}