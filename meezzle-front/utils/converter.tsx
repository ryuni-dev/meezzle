enum week {
    SUN = 1,
    MON,
    TUE,
    WEN,
    THR,
    FRI,
    SAT,
}

interface DataProps {
    ableDayOfWeeks: string,
    participleTimes: string,
}
const testData = {
    ableDayOfWeeks: 'MON',
    participleTimes: '13:00-15:00,17:30-21:30',
}

// Generic 관련 수정 필요
export const ConvertDays4Client = (data:DataProps) => {
    const length = data.ableDayOfWeeks.length;
    for(let i = 0; i < length; i++){
        const times = ChangeTime4Client(data.participleTimes);
    }
} 

const ChangeTime4Client = (participleTimes: string): number[] => {
    const timeArr:number[] = [];
    const times = participleTimes.split(',');
    for(let i = 0; i < times.length; i++){
        const time = times[i].split('-');
        const startTime = 2 * Number(time[0].split(':')[0]) + (Number(time[0].split(':')[1]) % 30);
        const endTime = 2 * Number(time[1].split(':')[0]) + (Number(time[1].split(':')[1]) % 30);

        for(let t = startTime; t <= endTime; t++){
            timeArr.push(t);
        }
    }
    return timeArr;
}


