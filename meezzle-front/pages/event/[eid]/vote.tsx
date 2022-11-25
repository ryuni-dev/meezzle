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
import { useEffect, useState } from "react";
import TimeSelect from "../../../components/event/Vote/TimeSelect";
import Btn from "../../../components/common/Btn";


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
    // margin-left: 12%;
    // margin-right: 0px;
`

const ReviseEvent: NextPage = () => {
    const [now, setNow] = useRecoilState(voteNow);
    const [selectedDay, setSelectedDay] = useRecoilState(eventDaySelected);

    const GoNextDay = ():void => {
        const idx = selectedDay.findIndex(i => i === now) + 1;
        if(idx >= 0 && idx < selectedDay.length) {
            setNow(selectedDay[idx])
        }
    }

    const GoPrevDay = ():void => {
        const idx = selectedDay.findIndex(i => i === now) - 1;
        if(idx >= 0 && idx < selectedDay.length) {
            setNow(selectedDay[idx])
        }
    }

    const BtnPrint = ():JSX.Element => {
        if(selectedDay.length === 1){
            return (
                <>
                    <LinkBtn text="제출하기!" href="/" color={true} Click={GoNextDay}></LinkBtn>
                    <LinkBtn text="< 이벤트 설명 보기" href="/" color={false} Click={GoPrevDay}></LinkBtn>
                </>
            )
        }
        else if(now === selectedDay[0]){
            return (
                <>
                    <Btn text="다음 요일로 이동하기" color={true} useDisable={false} Click={GoNextDay}></Btn>
                    <LinkBtn text="< 이벤트 설명 보기" href="/" color={false} Click={GoPrevDay}></LinkBtn>
                </>
            )
        }
        else if(now === selectedDay[selectedDay.length-1]){
            return (
                <>
                    <LinkBtn text="제출하기!" href="/" color={true} Click={GoNextDay}></LinkBtn>
                    <Btn text="< 이전 요일로 이동하기" color={false} Click={GoPrevDay}></Btn>
                </>
            )
        }
        else {
            return (
                <>
                    <Btn text="다음 요일로 이동하기" Click={GoNextDay} color={true}></Btn>
                    <Btn text="< 이전 요일로 이동하기" color={false} Click={GoPrevDay}></Btn>
                </>
            )
        }
    }
    useEffect(()=> {
        setNow(selectedDay[0]);
    }, []);

    return (
        <>
        <Navbar>
            <></>
        </Navbar>
        <Body>
            <DayBar></DayBar>
            <TimeSelect></TimeSelect>
            <Footer>
                {BtnPrint()}
            </Footer>
        </Body>
        </>
        )
};

export default ReviseEvent;
