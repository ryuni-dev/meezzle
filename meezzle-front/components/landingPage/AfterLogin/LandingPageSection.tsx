import React, { useEffect } from "react";
import styled from "styled-components";
import { NextComponentType } from "next";
import { Button } from "../../../styled-components/StyledButton";
import plus from "../../../public/assets/plus.svg";
import Image from "next/image";
import Link from "next/link";
import { useEvents } from "../../../hooks/api/events";
import { EventBox } from "./EventBox";
import HashLoader from "react-spinners/HashLoader";

const LoaderBox = styled.div`
    margin-top: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const LandingPageSection: NextComponentType = () => {
    // 유저가 처음 로그인 시엔 isLoading을, 로그인 한 상태에서 새로고침 시엔 isFetching을 사용
    const { data, isFetching, isLoading, refetch } = useEvents();

    const events = data;

    useEffect(()=> {
        refetch();
    },[]);

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
                isLoading ?
                <LoaderBox>
                    <HashLoader color="#3278DE" />
                </LoaderBox>
                :
            <ScheduleContainer>
                <h3>Schedule</h3>
                
                {Object.keys(events).length === 0 
                ? <h3>이벤트를 생성해보세요</h3>
                :
                    //@ts-ignore
                events.data.map((e, idx:number) => (
                    <Link href={{
                        pathname: '/event/[eid]/info',
                        query: {eid: e.event.id}
                    }}
                        key={idx}
                    >
                        <a>

                        <EventBox
                            eid={e.event.id}
                            key={e.event.id}
                            title={e.event.title}
                            userNum={e.eventParticipants.length}
                            color={e.event.color}
                            dday={e.event.dday}
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
