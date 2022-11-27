import { NextApiRequest, NextApiResponse } from "next";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

const events = [
    { 
        title: "미미 긴급 회의 ",
        color: "#FFE86D",
        days: [2, 3, 6, 7],
        startTime: setHours(setMinutes(new Date(), 0), 10),
        endTime: setHours(setMinutes(new Date(), 0), 20),
        dday: setHours(setMinutes(new Date(), 30), 23),
        description: "여러분 예상치 못한 변수가 생겼어요 회의를 해야합니다 \n\n<회의 안건> \r\n1. 드래그 방식 논의  \n2. 추가 기능 논의 \n3.디자인 피드백"
    }
]

export default (req:NextApiRequest, res:NextApiResponse) => {
    res.status(200).json(events)
}