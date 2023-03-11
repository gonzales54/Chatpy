import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import firebaseConfig from "@/config/firebase";
import useRedirectTo from "@/hooks/useRedirectTo";
import ProfileImage from '@Image/profile.jpg'

export default function UserHome() {
  const redirectTo = useRedirectTo();
  const router = useRouter();
  console.log(router.asPath)

  useEffect(() => {
    signOut(firebaseConfig.auth())
  },[])

  return (
    <>
      <div className="flex h-screen w-full flex-col">
        <div className="flex items-center border-b border-gray-300 px-4 py-3">
          <button className="mr-2" onClick={() => redirectTo('/')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <h1 className="font-klee text-sm">Test</h1>
        </div>
        <div className="relative mb-10 h-36 w-full bg-teal-900">
          <p className="absolute -bottom-5 left-8">
            <Image
              src={ProfileImage}
              alt="SignIn Icon"
              className="h-10 w-10 rounded-full object-cover"
              priority
            /> 
          </p>
        </div>
        <div className="px-10 text-right">
          <h2 className="mb-4 text-left font-klee text-2xl font-semibold">Test</h2>
          <p className="mb-4 text-left font-klee text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <Link href="/" className="text-xs text-gray-400">ユーザー情報編集</Link>
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
    </>
  )
}