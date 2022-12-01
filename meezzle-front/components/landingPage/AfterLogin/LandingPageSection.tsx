import React from "react";
import styled from "styled-components";
import { NextComponentType } from "next";
import { Button } from "../../../styled-components/StyledButton";
import plus from "../../../public/assets/plus.svg";
import Image from "next/image";
import Link from "next/link";
import { useEvents } from "../../../hooks/api/events";
import { EventBox } from "./EventBox";

const LandingPageSection: NextComponentType = () => {
    // 유저가 처음 로그인 시엔 isLoading을, 로그인 한 상태에서 새로고침 시엔 isFetching을 사용
    const { data, isFetching, isLoading } = useEvents();
    // console.log("aa", data);
    // const events = [
    //     { key: 1, title: "미미 긴급 회의", userNum: 5 },
    //     { key: 2, title: "팀플1 회의 - 다음주만", userNum: 5 },
    //     { key: 3, title: "미미 팀 전체 회식", userNum: 8 },
    // ];
    const events = data;
    return (
        <>
            <ButtonContainer>
                <Link href="/event/create">
                    <Button>
                        <Image src={plus} alt="plus" />
                        <p>이벤트 생성하기</p>
                    </Button>
                </Link>
            </ButtonContainer>
            {
                isFetching ? null :
            <ScheduleContainer>
                <h3>Schedule</h3>
                {
                    //@ts-ignore
                events.map((e, idx:number) => (
                    <Link href={{
                        pathname: '/event/[eid]/info',
                        query: {eid: e.eid.toString()}
                    }}
                        key={idx}
                    >
                        <a>

                        <EventBox
                            eid={e.eid}
                            key={e.eid}
                            title={e.title}
                            userNum={e.userNum}
                            color={e.color}
                            ></EventBox>
                        </a>
                    </Link>
                ))}
            </ScheduleContainer>
            }
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
