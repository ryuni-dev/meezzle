import type { NextPage } from "next";
import { useRecoilState } from "recoil";
import styled, { keyframes } from 'styled-components';
// import { CSSTransition } from 'react-transition-group' 


import EventCreate from "../components/event/Create/EventCreate";
import EventDate from "../components/event/Create/EventDay";
import EventDue from "../components/event/Create/EventDue";
import EventExplain from "../components/event/Create/EventExplain";
import EventName from "../components/event/Create/EventName";
import EventTime from "../components/event/Create/EventTime";
import { inputStage } from "../states/eventCreate";

import EventDay from "../components/event/Create/EventDay";
import Btn from "../components/common/Btn";
import { useEffect, useRef } from "react";
import EventColor from "../components/event/Create/EventColor";

const Body = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
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
    width: 100%;
    height: 90px;
    margin-top: 1rem;
    margin-left: 10%;
    margin-right: 0px;
    position : fixed;
    bottom : 0;
`
const Move = keyframes` 
from {
  transform: translateY(0%);
}
to {
  transform: translateY(10%);
}
  `;

const TransitionDiv = styled.div`
    animation: ${Move} 1s linear forwards infinite;
    // transition: all 0.6s ease-out;
`

const FocusTransitionDiv = styled.div`
    transition: 0.6s ease-out;
`


const CreatePage: NextPage = () => {
    const BtnText = [
        '요일 선택하러 가기',
        '시간 선택하러 가기',
        '마감일 선택하러 가기',
        '이벤트 색상 선택하러 가기',
        '설명 적으러 가기',
        '이벤트 생성하기!'
    ]
    
    const [stage, setStage] = useRecoilState(inputStage);
    const nameRef = useRef<HTMLInputElement>();
    // const explainRef = useRef<HTMLTextAreaElement>();

    const StageManager = (stage: number): JSX.Element => {
        switch(stage) {
            case 0:
                return (
                    <FocusTransitionDiv>
                        <EventName inputRef={nameRef}></EventName>
                    </FocusTransitionDiv>
                )
            case 1: 
                return (
                    <>
                    <EventDate></EventDate>
    
                        <EventName></EventName>
    
                    </>
                )
            case 2: 
                return (
                    <>
                        <EventTime></EventTime>
    
                        <EventDate></EventDate>
                        <EventName></EventName>
    
                    </>
                ) 
            case 3:
                return (
                    <>
                        <EventDue></EventDue>
    
                        <EventTime></EventTime>
                        <EventDate></EventDate>
                        <EventName></EventName>
    
                    </>
                ) 
            case 4:
            return (
                <>
                    <EventColor></EventColor>

                    <EventDue></EventDue>
                    <EventTime></EventTime>
                    <EventDay></EventDay>
                    <EventName></EventName>
                </>
            ) 
            case 5:
                return (
                    <>
                        <EventExplain></EventExplain>

                        <EventColor></EventColor>
                        <EventDue></EventDue>
                        <EventTime></EventTime>
                        <EventDay></EventDay>
                        <EventName></EventName>
                    </>
                ) 
            default:
                return <EventName></EventName>;
        }
    } 
    useEffect(()=> {
        nameRef.current?.focus();
    },[]);

    const ChangeStage = () => {
        if(stage < 6) {
            setStage((st) => st + 1);
        }
    }

    return (
        <Body>
            <EventCreate>
                {StageManager(stage)}
            </EventCreate>
            <Footer>
            <Btn Click={ChangeStage} text={BtnText[stage]}></Btn>
            </Footer>
        </Body>
        )
};

export default CreatePage;
