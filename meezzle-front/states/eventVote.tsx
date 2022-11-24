import { atom  } from "recoil";
import { v1 } from "uuid";

export const voteNow = atom({
    key: `voteNow/${v1()}`,
    default: 1,
});
