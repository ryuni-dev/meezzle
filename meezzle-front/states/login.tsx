import { atom, useSetRecoilState, AtomEffect } from "recoil";
import { recoilPersist } from "recoil-persist";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { v1 } from "uuid";


const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
    key: 'login',
    storage: sessionStorage,
});


export const LoginState = atom<boolean>({
    key: `loginState`,
    default: false,
    effects_UNSTABLE: [persistAtom],
});

// NextJS가 SSR이라서 session 이나 local storage 접근 시 hydaration 오류 발생
// useEffect를 사용해서 mount 된 이후 접근 할 수 있도록 함
export function useLogin() {
    const [isInitial, setIsInitial] = useState(true);
    const [loginState, setLoginState] = useRecoilState(LoginState);

    useEffect(() => {
        setIsInitial(false);
    }, []);

    return [isInitial ? false : loginState, setLoginState] as const;
}
