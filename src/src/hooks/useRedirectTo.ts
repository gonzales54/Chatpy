import { useRouter } from "next/router";

export default function useRedirectTo() {
  const router = useRouter();
  const redirectTo = (url: string): void => {
    router.push(url);
  };

  const redirectPreviousPage = (): void => {
    router.back();
  };

  return { redirectTo, redirectPreviousPage };
}
