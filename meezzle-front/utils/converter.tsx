enum week {
    SUNDAY = 1,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
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


const dd = {
    "code": "SUCCESS",
    "message": "string",
    "data": {
      "id": 0,
      "hostId": 0,
      "title": "string",
      "selectableParticipleTimes": [
        "MONDAY[T]10:00:00-12:00:00|13:00:00-14:00:00|"
      ],
      "selectedParticipleTimes": [
        "MONDAY[T]10:00-12:00|13:00-14:00|"
      ],
      "color": "#FFFFFFFF",
      "description": "string",
      "dday": "2022-05-30T12:00:00.000"
    }
  }

interface Props {
    code: string,
    message: string,
    data: {
        id: number,
        hostId: number,
        title: string,
        selectableParticipleTimes: string[],
        selectedParticipleTimes: string[],
        color: string,
        description: string,
        dday: string,
    }
}
export const ConvertDays4Client = (data:string[]) => {
    let selectedTimes:number[] = [];
    const length = data.length;
    for(let i = 0; i < length; i++){
        if(data[i]){
            const day = Object.values(week).indexOf(data[i].split('[T]')[0]) + 1
            const times = EncodeTime(data[i].split('[T]')[1], day);
            selectedTimes = [...selectedTimes, ...times];
        }
    }
    return Array.from(new Set(selectedTimes));
} 

const EncodeTime = (participleTimes: string, day: number): number[] => {
    const timeArr = [];
    try {
        const times = participleTimes.split('|');
        for(let i = 0; i < times.length-1; i++){
            const time = times[i].split('-');
            const startTime = 100 * day + 2 * Number(time[0].split(':')[0]) + (Number(time[0].split(':')[1]) % 30);
            const endTime = 100 * day + 2 * Number(time[1].split(':')[0]) + (Number(time[1].split(':')[1]) % 30);
            for(let t = startTime; t <= endTime; t++){
                timeArr.push(t);
            }
        }
    }
    catch (e){
        console.log('ChangeTime4Client Error : ', e);
    }
    return timeArr;
}
const ConvertDays4Server = (data:number[]) => {
    try {  
        let setData = Array.from(new Set(data));
        setData.sort();
        const convertedData:string[] = [];
        for(let i = 0; i < data.length - 1 ; ){
            const sameDayEnd = IsSameDay(setData, i);
            let dayToken = '';
            const weekIdx = Math.trunc(setData[i] / 100);
            dayToken = week[weekIdx] + '[T]';
            
            for(let startIdx = i; startIdx < sameDayEnd; ) {
                const timeEndIdx = IsConsecutive(setData, startIdx);
                dayToken = dayToken + DecodeTime(setData[startIdx] % 100) + '-' + DecodeTime(setData[timeEndIdx] % 100) + '|';
                startIdx = timeEndIdx + 1;
            }
            convertedData.push(dayToken);
            i = sameDayEnd + 1;
        }
        return convertedData;
    }
    catch (e) {
        console.log('ChangeTime4Server Func Error : ', e);
    }
}

const DecodeTime = (time: number) => {
    if(time < 0 || time > 47){
        console.log('DecodeTime Func Error : Time range is wrong');
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


const IsConsecutive = (data: number[], startIdx: number) => {
    if(data.length !== 0) {
        for(let i = startIdx; i < data.length - 1; i++){
            if((data[i]+1) != (data[i+1])) {
                // 연속된 숫자열의 마지막 인덱스
                return i;
            }
        }
    }
    // 주어진 배열의 모든 숫자가 연속일 때
    return (data.length - 1)
}

const IsSameDay = (data: number[], startIdx: number) => {
    for (let i = startIdx; i < data.length - 1; i++){
        if(Math.trunc(data[i] / 100) !== Math.trunc(data[i+1] / 100)) {
            return i;
        }
    }
    return (data.length - 1);
}