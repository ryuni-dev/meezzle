import type { NextPage } from "next";
import { useRecoilState } from "recoil";
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
    width: 100%;
    height: 90px;
    margin-left: 12%;
    margin-right: 0px;
`

const ReviseEvent: NextPage = () => {
    // useEffect(()=> {
    //     nameRef.current?.focus();
    // });

    return (
        <>
        <Navbar>
            <></>
        </Navbar>
        <Body>
            <EventCreate text="이벤트 수정">
                <EventName></EventName>
                <EventDay></EventDay>
                <EventTime></EventTime>
                <EventDue></EventDue>
                <EventColor></EventColor>
                <EventExplain></EventExplain>
            </EventCreate>
            <Footer>
                <LinkBtn text="수정 완료!" href="/"></LinkBtn>
            </Footer>
        </Body>
        </>
        )
};

export default ReviseEvent;
