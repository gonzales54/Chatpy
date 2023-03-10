import { useRouter } from "next/router"
import useFirebase from "@/hooks/useFirebase"

export default function User() {
  const router = useRouter()
  const { signOutUser } = useFirebase();

  return (
    <>
      <div>
        <button onClick={signOutUser}>ログアウト</button>
      </div>
    </>
  )
}