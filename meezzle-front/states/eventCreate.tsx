import { atom  } from "recoil";
import { v1 } from "uuid";

export const inputStage = atom({
    key: `inputStage/${v1()}`,
    default: 0,
});