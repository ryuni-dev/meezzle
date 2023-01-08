import { atom  } from "recoil";
import { v1 } from "uuid";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

const SettingToday = () => {
    const date = new Date().toISOString();
    const today = date.split('T')[0]

    return setHours(setMinutes(new Date(today), 30), 23)
}

export const eventInfo = atom({
    key: `eventInfo/${v1()}`,
    default: {
        title: '',
        selectableDays: [''],
        startTime: '',
        endTime: '',
        color: '#ffe86d',

        description: '',
        dday: '',
    },
});

export const eventTimeInfo = atom({
    key: `eventTimeInfo/${v1()}`,
    default: {
        startTime: setHours(setMinutes(new Date(), 0), 9),
        endTime: setHours(setMinutes(new Date(), 0), 22),
        dueTime: SettingToday()
    },
})