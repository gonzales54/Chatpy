import { User } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import UserGuard from "@/components/UserGuard";
import useFirebase from "@/hooks/useFirebase";
import useRedirectTo from "@/hooks/useRedirectTo";
import authUser from "@/store/authUser";

export default function UserHome() {
  const [isOptionOpen, setOptionOpen] = useState<boolean>(false);
  const redirectTo = useRedirectTo();
  const router = useRouter();
  const { signOutUser } = useFirebase();
  const user: User | null = useRecoilValue(authUser);
  

  const openOption = () => {
    setOptionOpen((option) => !option);
  }

  const LogOut = () => {
    signOutUser();
  }

  return (
    <>
      <UserGuard>
        <div className="flex h-screen w-full flex-col">
          <div className="relative flex items-center border-b border-gray-300 px-6 py-3">
            <h1 className="font-klee font-semibold">{user ? user!.displayName : ''}</h1>
            <button className="ml-auto" onClick={openOption}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
              </svg>
            </button>
            <div className={`absolute top-10 right-6 z-10 rounded border border-gray-400 bg-white py-2 ${isOptionOpen ? "block" : "hidden"}`}>
              <button className="w-full px-6 py-1 text-sm" onClick={LogOut}>Logout</button>
            </div>
          </div>
          <div className="relative mb-10 h-36 w-full bg-teal-900">
            <p className="absolute -bottom-5 left-8">
              <Image
                src={user ? user.photoURL! : ''}
                alt="SignIn Icon"
                className="rounded-full object-cover"
                width={64}
                height={64}
                priority
              />
            </p>
          </div>
          <div className="px-10 text-right">
            <p className="mb-4 text-left font-klee text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <Link href="/" className="font-klee text-xs text-gray-400">ユーザー情報編集</Link>
          </div>
          <ul className="mt-auto flex items-center justify-center border-t border-gray-300 px-6 py-2">
            <li className="mr-8">
              <Link href={'/user'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </Link>
            </li>
            <li>
              <Link href={'/user/home'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill={router.asPath === '/user/home' ? 'text-gray-800' : ''} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>              
              </Link>
            </li>
          </ul>
        </div>        
      </UserGuard>

    </>
  )
}