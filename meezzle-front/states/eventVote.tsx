import { atom  } from "recoil";
import { recoilPersist } from "recoil-persist";
import { v1 } from "uuid";

const { persistAtom } = recoilPersist({
        key: 'voteNow',
});


export const voteNow = atom({
    key: `voteNow/${v1()}`,
    default: 1,
    effects_UNSTABLE: [persistAtom],
});

export const timeSelected = atom({
    key: `timeSelected/${v1()}`,
    default: [-1],
});

export const timeCurrent = atom({
    key: `timeCurrent/${v1()}`,
    default: [-1],
});

export const participant = atom({
    key: `participant/${v1()}`,
    default: {
        name: '',
        password: '',
    },
});