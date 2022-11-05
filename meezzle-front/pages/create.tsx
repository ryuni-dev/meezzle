import type { NextPage } from "next";
import { useRecoilState } from "recoil";
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group' 


import EventCreate from "../components/event/Create/EventCreate";
import EventDate from "../components/event/Create/EventDay";
import EventDue from "../components/event/Create/EventDue";
import EventExplain from "../components/event/Create/EventExplain";
import EventName from "../components/event/Create/EventName";
import EventTime from "../components/event/Create/EventTime";
import { inputStage } from "../states/eventCreate";

import EventDay from "../components/event/Create/EventDay";
import Btn from "../components/common/Btn";

const Footer = styled.div`
    display: flex;
    width: 100%;
    height: 90px;
    margin-top: 1rem;
    position : fixed;
    bottom : 0;
`
const StageManager = (stage: number): JSX.Element => {
    switch(stage) {
        case 0:
            return (
                <EventName></EventName>
            )
            break;
        case 1: 
            return (
                <>
                <CSSTransition in={true}  timeout={500}>
                    <EventDate></EventDate>
                </CSSTransition>
                    <EventName></EventName>
                </>
            )
            break;
        case 2: 
            return (
                <>
                    <EventTime></EventTime>
                    <EventDate></EventDate>
                    <EventName></EventName>
                </>
            ) 
            break;
        case 3:
            return (
                <>
                    <EventDue></EventDue>
                    <EventTime></EventTime>
                    <EventDate></EventDate>
                    <EventName></EventName>
                </>
            ) 
            break;
        case 4:
            return (
                <>
                    <EventExplain></EventExplain>
                    <EventDue></EventDue>
                    <EventTime></EventTime>
                    <EventDay></EventDay>
                    <EventName></EventName>
                </>
            ) 
            break;
        default:
            return <EventName></EventName>;
            break;
    }
} 

const CreatePage: NextPage = () => {
    const BtnText = [
        '요일 선택하러 가기',
        '시간 선택하러 가기',
        '마감일 선택하러 가기',
        '설명 적으러 가기',
        '이벤트 생성하기!'
    ]
    
    const [stage, setStage] = useRecoilState(inputStage);

    const ChangeStage = () => {
        if(stage < 5) {
            setStage((stage) => stage+1);
        }
    }

    return (
        <>
            <EventCreate>
                {StageManager(stage)}
            </EventCreate>
            <Footer>
            <Btn click={ChangeStage} text={BtnText[stage]}></Btn>
            </Footer>
        </>
        )
};

export default CreatePage;
