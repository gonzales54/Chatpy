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

export default function edit() {
  const [isOptionOpen, setOptionOpen] = useState<boolean>(false);
  const { redirectPreviousPage } = useRedirectTo();
  const router = useRouter();
  const { signOutUser } = useFirebase();
  const user: User | null = useRecoilValue(authUser);

  return (
    <>
      <UserGuard>
        <div className="flex h-screen w-full flex-col">
          <div className="relative flex items-center border-b border-gray-300 px-6 py-3">
            <button className="mr-2" onClick={redirectPreviousPage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <h1 className="font-klee font-medium">ユーザー情報の変更</h1>
          </div>
          <div className="relative mb-10 h-36 w-full bg-teal-900">
            <p className="absolute -bottom-5 left-8">
              <Image
                loader={() => user?.photoURL!}
                src={user?.photoURL!}
                alt="User Icon"
                className="rounded-full object-cover"
                width={64}
                height={64}
                referrerPolicy="no-referrer"
              />
            </p>
          </div>
          <div className="px-10 text-right">
            <input type="text" name="username" id="username" className="mb-4 w-full px-2 py-1 rounded font-klee text-xl outline outline-1 outline-gray-400 focus:outline-gray-400" placeholder={user ? user.displayName! : ""}/>
            <textarea name="description" id="description" cols={30} rows={10} className="mb-4 w-full px-2 py-1 rounded font-klee text-sm outline outline-1 outline-gray-400 focus:outline-gray-400" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua."></textarea>
            <div>
              <button type="button" className="mr-4 font-klee text-sm text-gray-500">保存</button>
              <button type="button" className="font-klee text-sm text-teal-500" onClick={redirectPreviousPage}>キャンセル</button>              
            </div>

          </div>
          <ul className="mt-auto flex items-center justify-center border-t border-gray-300 px-6 py-2">
            <li className="mr-8">
              <Link href={`/${user?.displayName!}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={router.asPath === `/${user?.displayName!}` ? "text-gray-800" : ""}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link href={`/${user?.displayName!}/home`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={router.asPath === `/${user?.displayName!}/home` ? "text-gray-800" : ""}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </UserGuard>
    </>
  );
}
