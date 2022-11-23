import React from "react";
import styled from "styled-components";
import { NextComponentType } from "next";
import { Button } from "../../../styled-components/StyledButton";
import plus from "../../../public/assets/plus.svg";
import Image from "next/image";
import { EventBox } from "./EventBox";
import Link from "next/link";

const LandingPageSection: NextComponentType = () => {
    const events = [
        { key: 1, title: "미미 긴급 회의", userNum: 5 },
        { key: 2, title: "팀플1 회의 - 다음주만", userNum: 5 },
        { key: 3, title: "미미 팀 전체 회식", userNum: 8 },
    ];
    return (
        <>
            <ButtonContainer>
                <Link href="/create">
                    <Button>
                        <Image src={plus} alt="plus" />
                        <p>이벤트 생성하기</p>
                    </Button>
                </Link>
            </ButtonContainer>
            <ScheduleContainer>
                <h3>Schedule</h3>
                {events.map((e, idx) => (
                    <EventBox
                        idx={idx}
                        key={e.key}
                        title={e.title}
                        userNum={e.userNum}
                    ></EventBox>
                ))}
            </ScheduleContainer>
        </>
    );
};

export default LandingPageSection;

const ButtonContainer = styled.div`
    width: 100%;
    height: 80px;
    display: table;
    margin-left: auto;
    margin-right: auto;
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    & > button span {
        display: table-cell;
        vertical-align: middle;
    }
    & > button > p {
        margin: 0;
        vertical-align: middle;
        display: inline;
        padding-left: 15px;
    }
`;

const ScheduleContainer = styled.section`
    margin-left: auto;
    margin-right: auto;
    width: 92%;

    user-select: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    & > h3 {
        font-family: "Pretendard";
        font-weight: 600;
        font-size: 15px;
        margin-left: 10px;
    }
`;
