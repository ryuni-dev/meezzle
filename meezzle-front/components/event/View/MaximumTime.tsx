import styled from "styled-components";
import Toggle from "./Toggle";
import { MouseEvent, useState } from "react";

type Props = {
    time: {
        times: {
            time: number;
            attendee: string[];
        }[];
        max: number;
    };
};

type toggleTime = {
    weekday: string;
    time: string;
    attendee: string[];
    absentee: string[];
}[];

const MaximumTime: React.FC<Props> = ({ time }: Props) => {
    const [toggleProps, setToggleProps] = useState<toggleTime>([
        {
            weekday: "일요일",
            time: "12:00-16:00",
            attendee: ["상오", "경륜", "영로"],
            absentee: ["지은", "성현"],
        },
        {
            weekday: "월요일",
            time: "12:00-16:00",
            attendee: ["상오", "경륜", "영로"],
            absentee: ["지은", "성현"],
        },
        {
            weekday: "화요일",
            time: "12:00-16:00",
            attendee: ["상오", "경륜", "영로"],
            absentee: ["지은", "성현"],
        },
    ]);
    return (
        <>
            <P>
                최대 {time.max}명이 같이 모일 수 있어요!
                <span style={{ lineHeight: "170%" }}>
                    <br />
                </span>
                {time.max}명이 가능한 시간은 다음과 같아요.
            </P>
            <ToggleContainer>
                {toggleProps.map((el, idx) => {
                    return <Toggle toggleTime={el} key={idx} />;
                })}
            </ToggleContainer>
        </>
    );
};

export default MaximumTime;

const P = styled.p`
    margin-left: 20px;
    font-size: 14px;
    font-family: "Pretendard";
`;

const ToggleContainer = styled.div`
    margin-left: 20px;
    font-size: 14px;
    font-family: "Pretendard";
    font-weight: 500;
`;
