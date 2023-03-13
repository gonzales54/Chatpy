import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import useFirebase from "@/hooks/useFirebase";
import useRedirectTo from "@/hooks/useRedirectTo";
import authUser from "@/store/authUser";
import style from "@/styles/app.module.css";
import GoogleImage from "@Image/google.png";
import SignUpImage from "@Image/signup.svg";

export default function SignUp(): JSX.Element {
  const { redirectTo } = useRedirectTo();
  const [isPasswordOpen, setPasswordOpen] = useState<boolean>(false);
  const { signUpUser, googleAuthentication } = useFirebase();
  const setUser = useSetRecoilState(authUser);
  const submitFormForSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(e?.target instanceof HTMLFormElement)) return;

    const username = e?.target.username.value;
    const email = e?.target.email.value;
    const password = e?.target.password.value;

    const user = await signUpUser(username, email, password);

    if (!user) return;

    if (typeof user !== "string" || "undefined") {
      setUser(JSON.parse(JSON.stringify(user.user)));
      redirectTo(`/${user!.user.displayName}/home`);
    }

    e.target.reset();
  };

  const backToPreviousPage = () => {
    redirectTo("/");
  };

  const passwordOpen = () => {
    setPasswordOpen((password) => !password);
  };

  const signUpWithGoogle = async () => {
    const user = await googleAuthentication();
    if (!user) return;
    setUser(JSON.parse(JSON.stringify(user.user)));
    redirectTo(`/${user.user.displayName}/home`);
  };

  return (
    <>
      <div className="flex h-screen w-full flex-col px-10 pt-8">
        <div className="mb-10 flex items-center justify-between">
          <button onClick={backToPreviousPage} className="mr-auto">
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
          <h1 className="mr-auto pr-7 font-courgette text-gray-800">Chatpy</h1>
        </div>
        <Image
          src={SignUpImage}
          alt="SignIn Icon"
          className="mx-auto mb-10 h-52 w-80"
          priority
        />
        <h2 className="mb-8 font-klee text-[2rem] font-bold text-gray-800">
          サインアップ
        </h2>
        <form onSubmit={submitFormForSignUp}>
          <div className="mb-5 rounded-sm outline outline-1 outline-gray-400">
            <input
              type="text"
              name="username"
              id="username"
              className="w-full px-4 py-2 focus:outline-none"
              placeholder="ユーザーネーム"
            />
          </div>
          <div className="mb-5 outline outline-1 outline-gray-400">
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-2 focus:outline-none"
              placeholder="Eメール"
            />
          </div>
          <div className="mb-10 flex items-center rounded-sm px-4 outline outline-1 outline-gray-400">
            <input
              type={isPasswordOpen ? "text" : "password"}
              name="password"
              id="password"
              className="mr-2 w-full py-2 focus:outline-none"
              placeholder="パスワード"
            />
            <div onClick={passwordOpen}>
              {isPasswordOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded bg-teal-500 py-2 font-klee font-bold text-teal-50"
          >
            サインアップ
          </button>
        </form>
        <p className="mt-2 mb-8 text-right font-klee text-xs">
          アカウントを持っている場合、
          <Link href={"/signin"} className="text-rose-500">
            サインイン
          </Link>
        </p>
        <h3
          className={`mb-6 text-center font-klee text-gray-800 ${style.signText}`}
        >
          サインアップオプション
        </h3>
        <button
          type="button"
          className="flex w-full items-center justify-center rounded border border-gray-400 py-2"
          onClick={signUpWithGoogle}
        >
          <div className="pr-2">
            <Image
              src={GoogleImage}
              alt="Google Icon"
              className="h-6 w-6"
              priority
            />
          </div>
          Google
        </button>
      </div>
    </>
  );
}
