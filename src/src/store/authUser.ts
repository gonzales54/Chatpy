import { User } from "firebase/auth";
import { atom } from "recoil";

const authUser = atom<User | null>({
  key: 'authUserKey',
  default: null
});

export default authUser;