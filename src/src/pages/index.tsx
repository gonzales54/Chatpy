import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import useRedirectTo from "@/hooks/useRedirectTo";
import AppImage from "@Image/app.svg";

const inter = Inter({ subsets: ["latin"] });

export default function Home(): JSX.Element {
  const [active, setActive] = useState({
    signUp: true,
    signIn: false,
  });
  const redirectTo = useRedirectTo();

  function handleHoverButton(e: MouseEvent<HTMLButtonElement>) {
    if (!(e.target instanceof HTMLButtonElement)) return;
    if (e.target.id === "signIn") {
      setActive({ ...active, signUp: false, signIn: true });
    } else {
      setActive({ ...active, signUp: true, signIn: false });
    }
  }

  function handleClickButton(url: string): void {
    redirectTo(url);
  }

  return (
    <>
      <Head>
        <title>Chatpy</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen w-full px-10 pt-8 text-center">
        <h1 className="mb-16 font-courgette text-gray-800">
          <Link href={"/"}>Chatpy</Link>
        </h1>
        <Image
          src={AppImage}
          alt="Welcome Icon"
          className="mx-auto mb-14 h-64 w-80"
          priority
        />
        <h2 className="mb-10 font-klee text-[2rem] font-bold text-gray-800">
          ようこそ、Chatpyへ
        </h2>
        <p className="mx-auto mb-20 text-left font-klee text-sm font-bold text-gray-800">
          Chatpyはメッセージアプリです。このアプリは友達追加やチャットなどの機能を備えています。シンプルだからこそ使いやすい。徹底的にシンプルさを追求しました。
        </p>
        <div>
          <button
            id="signUp"
            className={`rounded px-10 py-3 font-poppins text-xs ${
              active.signUp
                ? "bg-teal-500 text-gray-50"
                : "bg-gray-100 text-gray-800"
            }`}
            onClick={() => handleClickButton("/signup")}
            onMouseOver={handleHoverButton}
          >
            サインアウト
          </button>
          <button
            id="signIn"
            className={`rounded px-10 py-3 font-poppins text-xs ${
              active.signIn
                ? "bg-teal-500 text-gray-50"
                : "bg-gray-100 text-gray-800"
            }`}
            onClick={() => handleClickButton("/signin")}
            onMouseOver={handleHoverButton}
          >
            サインイン
          </button>
        </div>
      </div>
    </>
  );
}
