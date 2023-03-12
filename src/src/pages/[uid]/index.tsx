import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router"
import { useRecoilValue } from "recoil";
import UserGuard from "@/components/UserGuard";
import authUser from "@/store/authUser";
import ProfileImage from '@Image/profile.jpg'

export default function User() {
  const router = useRouter();
  const user = useRecoilValue(authUser);

  return (
    <>
      <UserGuard>
      </UserGuard>
      <div className="flex h-screen w-full flex-col">
        <div className="mb-6 flex items-center justify-between border-b border-gray-300 px-6 py-2">
          <h1 className="font-courgette text-sm">Chatpy</h1>
          <p>
            <Image
              src={user ? user.photoURL! : ''}
              alt="SignIn Icon"
              className="rounded-full object-cover"
              width={32}
              height={32}
              priority
            />
          </p>
        </div>
        <div>
          <h2 className="mb-4 px-6 font-klee text-xs">メッセージ一覧</h2>
          <ul>
            <li>
              <Link href="/user" className="flex px-6 py-2">
                <p className="mr-4">
                  <Image
                    src={ProfileImage}
                    alt="SignIn Icon"
                    className="h-8 w-8 rounded-full object-cover"
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
        <ul className="mt-auto flex items-center justify-center border-t border-gray-300 px-6 py-2">
          <li className="mr-8">
            <Link href={'/user'}>
              <svg xmlns="http://www.w3.org/2000/svg" fill={router.asPath === '/user' ? 'text-gray-800' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </Link>
          </li>
          <li>
            <Link href={'/user/home'}>
              <svg xmlns="http://www.w3.org/2000/svg" fill={router.asPath === '/user/home' ? 'text-gray-800' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>              
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}