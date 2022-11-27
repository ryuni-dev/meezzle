import { NextPage } from "next";
import { useEffect, useState } from "react";
import ViewTable from "../../../components/event/View/ViewTable";
import Navbar from "../../../components/common/Navbar";
import shareNav from "../../../public/assets/shareNav.svg";
import Image from "next/image";
import H1 from "../../../components/event/View/Title";
import Tooltip from "../../../components/event/View/Tooltip";
import Attendee from "../../../components/event/View/Attendee";
import { ThinLine } from "../../../styled-components/StyledThinLine";
import MaximumTime from "../../../components/event/View/MaximumTime";
import styled from "styled-components";

type tableInfoType = {
    row: number;
    col: { length: number; names: string[] };
};

/* Table 상에서 시간 한 칸 클릭 시 받아오는 데이터 */
type attendeeInfoType = {
    total: string[];
    attendee: string[];
};

/* 최대로 모일 수 있는 시간 페이지 로드시 fetch 해 올 데이터 */
type bestTimeType = {
    times: {
        time: number; // Table Box의 key와 같은 형식의 시간
        attendee: string[]; // 참여자들
    }[];
    max: number; // 최대로 가능한 시간의 인원 수
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
    const [total, setTotal] = useState<number>(3);
    const [tableInfo, setTableInfo] = useState<tableInfoType>({
        row: 48,
        col: {
            length: 7,
            names: ["일", "월", "화", "수", "목", "금", "토"],
        },
    });
    const [attendeeInfo, setAttendeeInfo] = useState<attendeeInfoType>({
        total: ["상오", "경륜", "영로", "지은", "재훈"],
        attendee: ["상오", "경륜", "영로", "지은"],
    });
    const [bestTime, setBestTime] = useState<bestTimeType>({
        times: [
            { time: 105, attendee: ["경륜", "상오", "지은"] },
            { time: 106, attendee: ["경륜", "상오", "영로"] },
        ],
        max: 3,
    });

    useEffect(() => {
        // best time type fetch 하기
    }, []);

    return (
        <Body>
            <Navbar>
                <Image src={shareNav} alt="share" />
            </Navbar>
            <H1>총 {total}명이 참여했어요!</H1>
            <Tooltip>*시간을 클릭해보세요.</Tooltip>
            <ViewTable info={tableInfo} />
            {attendeeInfo && (
                <Container>
                    <Attendee attendeeInfo={attendeeInfo} />
                    <ThinLine />
                    <MaximumTime time={bestTime} />
                </Container>
            )}
        </Body>
    );
};

export default Test;

const Container = styled.div`
    width: 100%;
`;
