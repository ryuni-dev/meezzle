import { useEffect, useState } from "react";
import { atom, RecoilEnv, useRecoilState  } from "recoil";
import { recoilPersist } from "recoil-persist";
import { v1 } from "uuid";


// const sessionStorage =
//     typeof window !== "undefined" ? window.sessionStorage : undefined;

// const { persistAtom } = recoilPersist({
//         key: 'voteNow',
//         storage: sessionStorage,
// });


export const voteNow = atom({
    key: `voteNow/${v1()}`,
    default: -1,
    // effects_UNSTABLE: [persistAtom],
});

export const timeSelected = atom<number[]>({
    key: `timeSelected/${v1()}`,
    default: [],
    // effects_UNSTABLE: [persistAtom],

});

export const timeCurrent = atom<number[]>({
    key: `timeCurrent/${v1()}`,
    default: [],
});

export const participant = atom({
    key: `participant/${v1()}`,
    default: {
        name: '',
        password: '',
    },
});

// export function useLogin() {
//     const [isInitial, setIsInitial] = useState(true);
//     const [loginState, setLoginState] = useRecoilState(voteNow);

//     RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
//     useEffect(() => {
//         setIsInitial(false);
//     }, []);

//     return [isInitial ? false : loginState, setLoginState] as const;
// }