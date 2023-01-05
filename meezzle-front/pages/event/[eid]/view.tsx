import { NextPage } from "next";
import { useEffect, useState } from "react";
import ViewTable from "../../../components/event/View/ViewTable";
import Navbar from "../../../components/common/Navbar";
import shareNav from "../../../public/assets/shareNav.svg";
import Image from "next/image";
import H1 from "../../../components/event/View/Title";
import Tooltip from "../../../components/event/View/Tooltip";
import Attendee from "../../../components/event/View/Attendee";
import styled from "styled-components";

type tableInfoType = {
    row: number;
    col: { length: number; names: string[] };
};

/* 페이지 로드시 fetch 해 올 데이터 */
type TimeDataType = {
    times: {
        time: number; // Table Box의 key와 같은 형식의 시간
        attendee: string[]; // 참여자들
        absentee: string[];
    }[];
    total: number;
};

const Body = styled.div`
    display: flex;
    max-width: 400px;
    margin: 0 auto;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Test: NextPage = () => {
    const [tableInfo, setTableInfo] = useState<tableInfoType>({
        row: 48,
        col: {
            length: 7,
            names: ["일", "월", "화", "수", "목", "금", "토"],
        },
    });
    const [timeData, setTimeData] = useState<TimeDataType>({
        times: [
            {
                time: 101,
                attendee: ["경륜", "상오"],
                absentee: ["세호", "재석", "지은"],
            },
            {
                time: 105,
                attendee: ["경륜", "상오", "지은"],
                absentee: ["세호", "재석"],
            },
            {
                time: 106,
                attendee: ["경륜", "상오", "영로"],
                absentee: ["세호", "재석"],
            },

            {
                time: 121,
                attendee: ["경륜", "상오", "지금"],
                absentee: ["세호", "재석"],
            },
            {
                time: 122,
                attendee: ["경륜", "상오", "지동"],
                absentee: ["세호", "재석"],
            },
            {
                time: 123,
                attendee: ["경륜", "상오", "지은"],
                absentee: ["세호", "재석"],
            },
            {
                time: 124,
                attendee: ["경륜", "상오", "영로"],
                absentee: ["세호", "재석"],
            },

            {
                time: 125,
                attendee: ["경륜", "상오", "재훈"],
                absentee: ["세호", "재석"],
            },

            {
                time: 126,
                attendee: ["경륜", "상오", "윤하"],
                absentee: ["세호", "재석"],
            },

            {
                time: 127,
                attendee: ["경륜", "상오", "재상"],
                absentee: ["세호", "재석"],
            },
            {
                time: 136,
                attendee: ["경륜", "상오", "영로"],
                absentee: ["세호", "재석"],
            },
            {
                time: 137,
                attendee: ["경륜", "상오", "영로"],
                absentee: ["세호", "재석"],
            },
            {
                time: 138,
                attendee: ["경륜", "상오", "영로"],
                absentee: ["세호", "재석"],
            },
        ],
        total: 5,
    });
    const [clickedTime, setClickedTime] = useState<number | undefined>();
    const [clickedData, setClickedData] = useState<
        TimeDataType["times"][0] | undefined
    >();

    // const [mostJoinTimes, setMostJoinTimes] = useState<TimeDataType["times"]>(
    //     []
    // );

    // useEffect(() => {
    // let joinMax = 0;

    // for (let i = 0; i < timeData.times.length; i++) {
    //     joinMax =
    //         timeData.times[i].attendee.length > joinMax
    //             ? timeData.times[i].attendee.length
    //             : joinMax;
    // }
    // for (let i = 0; i < timeData.times.length; i++) {
    //     if (joinMax === timeData.times[i].attendee.length) {
    //         setMostJoinTimes([...mostJoinTimes, timeData.times[i]]);
    //     }
    // }
    // }, []);
    useEffect(() => {
        const clicked: TimeDataType["times"][0] | undefined = timeData[
            "times"
        ].find((el) => el.time === clickedTime);
        return setClickedData(clicked);
    }, [clickedTime]);

    return (
        <Body>
            <Navbar>
                <Image src={shareNav} alt="share" />
            </Navbar>
            <H1>총 {timeData.total}명이 참여했어요!</H1>
            <Tooltip>*시간을 클릭해보세요.</Tooltip>
            <ViewTable
                timeData={timeData}
                info={tableInfo}
                setClickedTime={setClickedTime}
            />
            {clickedData && (
                <Container>
                    <Attendee clickedData={clickedData} />
                    {/* <ThinLine />
                    <MaximumTime times={mostJoinTimes} /> */}
                </Container>
            )}
        </Body>
    );
};

export default Test;

const Container = styled.div`
    width: 372px;
    background-color: white;
    display: inline-block;
    position: fixed;
    margin: 0 auto;
    top: 85%;
    border: 1px solid gray;
    border-radius: 5px;
`;
