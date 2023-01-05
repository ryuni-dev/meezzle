import { atom  } from "recoil";
// import { recoilPersist } from "recoil-persist";
import { v1 } from "uuid";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

export const eventInfo = atom({
    key: `eventInfo/${v1()}`,
    default: {
        title: '',
        selectableDays: [''],
        startTime: '',
        endTime: '',
        color: '#FFE86D',

        description: '',
        dday: '',
    },
});

export const eventTimeInfo = atom({
    key: `eventTimeInfo/${v1()}`,
    default: {
        startTime: setHours(setMinutes(new Date(), 0), 9),
        endTime: setHours(setMinutes(new Date(), 0), 22),
        dueTime: setHours(setMinutes(new Date(), 30), 23),
    },
})
