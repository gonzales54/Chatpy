import { useRouter } from "next/router";

export default function useRedirectTo() {
  const router = useRouter();
  function redirectTo(url: string): void {
    router.push(url);
  }

  return redirectTo;
}
