import { atom  } from "recoil";
// import { recoilPersist } from "recoil-persist";
import { v1 } from "uuid";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

// const sessionStorage = 
//       typeof window !== 'undefined' ? window.sessionStorage : undefined

// const { persistAtom } = recoilPersist({
//     key: 'eventInfoPersist',
//     storage: sessionStorage,
// });

// const { persistAtom } = recoilPersist();

// export const persistAtomEffect = <T>(param: Parameters<AtomEffect<T>>[0]) => {
//     param.getPromise(ssrCompletedState).then(() => persistAtom(param))
//   }

export const eventInfo = atom({
    key: `eventInfo/${v1()}`,
    default: {
        title: '',
        color: '#FFE86D',
        startTime: setHours(setMinutes(new Date(), 0), 9),
        // startTime: new Date('9:00:00'),
        endTime: setHours(setMinutes(new Date(), 0), 22),
        dueDate: new Date(),
        dueTime: setHours(setMinutes(new Date(), 30), 23),
        description: '',
    },
    // effects: [persistAtom],
    // effects_UNSTABLE: [persistAtom]
    // effects_UNSTABLE: [persistAtom],

});

