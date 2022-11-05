import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { useSetRecoilState, useRecoilState } from "recoil";
import { useState, useEffect } from "react";

const { persistAtom } = recoilPersist();

export const LoginState = atom<boolean>({
  key: "LoginState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export function useLogin() {
  const [isInitial, setIsInitial] = useState(true);
  const [loginState, setLoginState] = useRecoilState(LoginState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? false : loginState, setLoginState] as const;
}
