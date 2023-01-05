import { atom  } from "recoil";
import { v1 } from "uuid";

export const eventDaySelected = atom<number[]>({
    key: `EventDayClick/${v1()}`,
    default: [],
});

export const eventDayCurrent = atom<number[]>({
    key: `EventDayCurrent/${v1()}`,
    default: [],
});
