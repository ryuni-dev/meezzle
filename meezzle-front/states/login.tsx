import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { v1 } from "uuid";

const { persistAtom } = recoilPersist();

export const LoginState = atom<boolean>({
    key: `loginState/${v1()}`,
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
