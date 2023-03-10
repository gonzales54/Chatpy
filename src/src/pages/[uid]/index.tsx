import { useRouter } from "next/router"
import useFirebase from "@/hooks/useFirebase"
import Image from "next/image";
import ProfileImage from '@Image/profile.jpg'
import Link from "next/link";

export default function User() {
  const router = useRouter()
  const { signOutUser } = useFirebase();

  return (
    <>
      <div className="h-screen w-full flex flex-col">
        <div className="mb-6 px-10 py-3 flex items-center justify-between border-b border-gray-300">
          <h1 className="font-courgette text-sm">Chatpy</h1>
          <p>
            <Image
              src={ProfileImage}
              alt="SignIn Icon"
              className="w-8 h-8 rounded-full object-cover"
              priority
            />
          </p>
        </div>
        <div>
          <h2 className="mb-4 px-10 font-klee text-xs">メッセージ一覧</h2>
          <ul>
            <li>
              <Link href="/" className="px-10 py-2 flex">
                <p className="mr-4">
                  <Image
                    src={ProfileImage}
                    alt="SignIn Icon"
                    className="w-8 h-8 rounded-full object-cover"
                    priority
                  />
                </p>
                <div>
                  <h3 className="font-poppins text-base">Test</h3>
                </div>
                <p className="ml-auto text-xs text-gray-400">17:07</p>
              </Link>
            </li>
          </ul>
        </div>
        <ul className="mt-auto px-10 py-2 flex justify-center items-center border-t border-gray-300">
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </li>
          <li className="mx-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </li>
        </ul>
      </div>
    </>
  )
}