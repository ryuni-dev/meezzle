import { atom  } from "recoil";
import { v1 } from "uuid";

export const voteNow = atom({
    key: `voteNow/${v1()}`,
    default: 1,
});

export const timeSelected = atom({
    key: `timeSelected/${v1()}`,
    default: [-1],
});

export const timeCurrent = atom({
    key: `timeCurrent/${v1()}`,
    default: [-1],
});