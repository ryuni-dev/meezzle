enum week {
    SUNDAY = 1,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
}

interface DataProps {
    ableDayOfWeeks: string,
    participleTimes: string,
}

const testData = [
    {
        ableDayOfWeeks: 'MONDAY',
        participleTimes: '13:00-15:00,17:30-21:30',
    },
    {
        ableDayOfWeeks: 'FRIDAY',
        participleTimes: '13:00-15:00,17:30-21:30',
    },
    {
        ableDayOfWeeks: 'SATURDAY',
        participleTimes: '9:00-12:30',
    }
]

// Generic 관련 수정 필요
export const ConvertDays4Client = (data:DataProps[]) => {
    let selectedTimes:number[] = [];
    const length = data[0].ableDayOfWeeks.length;
    for(let i = 0; i < length; i++){
        if(data[i]){
            const day = Object.values(week).indexOf(data[i].ableDayOfWeeks)
            const times = ChangeTime4Client(data[i].participleTimes, day);
            selectedTimes = [...selectedTimes, ...times];
        }
    }
    return Array.from(new Set(selectedTimes));
} 

const ChangeTime4Client = (participleTimes: string, day: number): number[] => {
    const timeArr = [];
    const times = participleTimes.split(',');
    for(let i = 0; i < times.length; i++){
        const time = times[i].split('-');
        const startTime = 100 * day + 2 * Number(time[0].split(':')[0]) + (Number(time[0].split(':')[1]) % 30);
        const endTime = 100 * day + 2 * Number(time[1].split(':')[0]) + (Number(time[1].split(':')[1]) % 30);
        let j = 0;
        for(let t = startTime; t <= endTime; t++){
            timeArr[j++] = t;
        }
    }
    return timeArr;
}


