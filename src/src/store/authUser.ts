import { User } from "firebase/auth";
import { atom, RecoilState } from "recoil";

const authUser = atom<User | null>({
  key: 'authUser',
  default: null
});

export default authUser;