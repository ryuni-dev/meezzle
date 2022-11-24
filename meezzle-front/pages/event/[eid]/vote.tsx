import type { NextPage } from "next";
import { useRecoilState, useRecoilValue } from "recoil";
import styled, { keyframes } from 'styled-components';
// import { CSSTransition } from 'react-transition-group' 


import EventCreate from "../../../components/event/Create/EventCreate";
import EventName from "../../../components/event/Create/EventName";
import EventDay from "../../../components/event/Create/EventDay";
import EventTime from "../../../components/event/Create/EventTime";
import EventDue from "../../../components/event/Create/EventDue";
import EventColor from "../../../components/event/Create/EventColor";
import EventExplain from "../../../components/event/Create/EventExplain";

import LinkBtn from "../../../components/common/LinkBtn";
import Navbar from "../../../components/common/Navbar";
import DayBar from "../../../components/event/Vote/DayBar";
import { voteNow } from "../../../states/eventVote";
import { eventDaySelected } from "../../../states/eventDayBox";
import { useEffect } from "react";


const Body = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 auto;
    max-width: 400px;
    // padding-left: 1%;
    width: 100%;
    overflow-x:hidden;
`

const Footer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 120px;
    margin-left: 12%;
    margin-right: 0px;
`

const ReviseEvent: NextPage = () => {
    const [now, setNow] = useRecoilState(voteNow);
    const [selectedDay, setSelectedDay] = useRecoilState(eventDaySelected);

    useEffect(()=> {
        setSelectedDay([2, 3, 6, 7].sort());
        setNow(selectedDay[0]);
    }, []);

    return (
        <>
        <Navbar>
            <></>
        </Navbar>
        <Body>
            <DayBar></DayBar>
            <Footer>
                <LinkBtn text="다음 요일로 이동!" href="/" color={true}></LinkBtn>
                <LinkBtn text="< 이전으로 돌아가기" href="/" color={false}></LinkBtn>
            </Footer>
        </Body>
        </>
        )
};

export default ReviseEvent;
