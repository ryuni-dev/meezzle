import { atom } from "recoil";

import { v1 } from "uuid";

export const guestToken = atom<string>({
    key: `guestToken/${v1()}`,
    default: "",
});
