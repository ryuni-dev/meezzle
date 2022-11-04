import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const LoginState = atom<boolean>({
  key: "LoginState",
  default: true,
  effects_UNSTABLE: [persistAtom],
});
