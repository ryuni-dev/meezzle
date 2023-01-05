import { atom } from "recoil";

import { v1 } from "uuid";

export const guestLogined = atom<boolean>({
    key: `guestLogined/${v1()}`,
    default: false,
});
