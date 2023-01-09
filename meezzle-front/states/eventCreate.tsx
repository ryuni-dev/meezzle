import { atom  } from "recoil";
import { v1 } from "uuid";

export const inputStage = atom({
    key: `inputStage/${v1()}`,
    default: 0,
});

export const btnDisable = atom({
    key: `eventExplain/${v1()}`,
    default: true,
});

export const inputFocus = atom({
    key: `inputFocus/${v1()}`,
    default: [],
});

export const ddayDisable = atom<boolean>({
    key: `ddayDisable/${v1()}`,
    default: false,
});