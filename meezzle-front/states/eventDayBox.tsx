import { atom  } from "recoil";
import { v1 } from "uuid";

export const eventDaySelected = atom({
    key: `EventDayClick/${v1()}`,
    default: [],
});

export const eventDayCurrent = atom({
    key: `EventDayCurrent/${v1()}`,
    default: [],
});
