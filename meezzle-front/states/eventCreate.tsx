import { atom  } from "recoil";
import { v1 } from "uuid";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

export const inputStage = atom({
    key: `inputStage/${v1()}`,
    default: 0,
});

export const eventName = atom({
    key: `eventName/${v1()}`,
    default: '',
});

export const eventStartTime = atom({
    key: `eventStartTime/${v1()}`,
    default: setHours(setMinutes(new Date(), 0), 9)
});

export const eventEndTime = atom({
    key: `eventEndTime/${v1()}`,
    default: setHours(setMinutes(new Date(), 0), 22)
});

export const eventDueDate = atom({
    key: `eventDueDate/${v1()}`,
    default: new Date(),
});

export const eventDueTime = atom({
    key: `eventDueTime/${v1()}`,
    default: setHours(setMinutes(new Date(), 30), 23)
});

export const eventDay = atom({
    key: `eventDay/${v1()}`,
    default: [],
});

export const eventExplain = atom({
    key: `eventExplain/${v1()}`,
    default: '',
});

export const btnDisable = atom({
    key: `eventExplain/${v1()}`,
    default: true,
});

export const inputFocus = atom({
    key: `inputFocus/${v1()}`,
    default: [],
});

export const eventColor = atom({
    key: `eventColor/${v1()}`,
    default: '#FFE86D',
});