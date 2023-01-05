import { atom } from "recoil";
import { v1 } from "uuid";

export const voteNow = atom({
    key: `voteNow/${v1()}`,
    default: -1,
});

export const timeSelected = atom<number[]>({
    key: `timeSelected/${v1()}`,
    default: [],
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