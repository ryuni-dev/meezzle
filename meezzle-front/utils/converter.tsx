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

const serverData = [
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

const clientData = [
    134, 135, 136, 137, 138, 139,
    140, 141, 142, 534, 535, 536,
    537, 538, 539, 540, 541, 542,
    618, 619, 620, 621, 622, 623,
    624
]

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

export const ConvertDays4Server = (data:number[]) => {
    const d = Array.from(new Set(data));
    const retData:DataProps[] = [];
    d.sort();
    for(let i = 0; i < d.length; i++){
        const weekIdx = Math.trunc(d[i] / 100);
        retData[i].ableDayOfWeeks = week[weekIdx];

    }
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

const DecodeTime = (time: number) => {
    if(time < 0 || time > 47){
        console.log('DecodeTime Func Error : time range is wrong')
    }
    else {
        const decode = ((time * 30) / 60).toFixed(1);
        const hour = decode.split('.')[0];
        if(decode.split('.')[1] === '0'){
            return ('00'+hour).slice(-2) + ':00';
        }
        else {
            return ('00'+hour).slice(-2) + ':30';
        }
    }
}

const ChangeTime4Server = (selectedTimes: number[]) => {

}


