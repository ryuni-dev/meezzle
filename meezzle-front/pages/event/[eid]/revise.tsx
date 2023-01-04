import type { GetServerSideProps, NextPage } from "next";
import { useRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
// import { CSSTransition } from 'react-transition-group'
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

import EventCreate from "../../../components/event/Create/EventCreate";
import EventName from "../../../components/event/Create/EventName";
import EventDay from "../../../components/event/Create/EventDay";
import EventTime from "../../../components/event/Create/EventTime";
import EventDue from "../../../components/event/Create/EventDue";
import EventColor from "../../../components/event/Create/EventColor";
import EventExplain from "../../../components/event/Create/EventExplain";

import LinkBtn from "../../../components/common/LinkBtn";
import Navbar from "../../../components/common/Navbar";
import { useRouter } from "next/router";
import { useEvent, useEventDelete } from "../../../hooks/api/events";
import { eventInfo } from "../../../states/eventInfo";
import { eventDaySelected } from "../../../states/eventDayBox";
import { moveMessagePortToContext } from "worker_threads";
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
    overflow-x: hidden;
`;

const Footer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 120px;
    margin-right: 0px;
    padding-left: 2vw;
`;

interface Props {
    params: {
        eid: string
    }
}

const ReviseEvent: NextPage<Props> = ({ params }) => {
    const { eid } = params;
    console.log(eid)
    //@ts-ignore
    const { data, isLoading } = useEvent(eid);
    const [days, setDays] = useRecoilState(eventDaySelected);
    const [event, setEvent] = useRecoilState(eventInfo);

    const deleteEvent = useEventDelete();

    const DeleteEvent = () => {
        //@ts-ignore
        deleteEvent.mutate(eid);
    };

    useEffect(() => {
        if (isLoading) {
            console.log("is loading...");
        } else {
            // console.log('data', data[0]);
            // setEvent({
            //     ...event,
            //     title: data[0].title,
            //     color: data[0].color,
            //     startTime: new Date(data[0].startTime),
            //     endTime: new Date(data[0].endTime),
            //     dueDate: new Date(data[0].dueDate),
            //     dueTime: new Date(data[0].dueTime),
            //     description: data[0].description
            // });
            setDays(data[0].days);
            // console.log(event)
        }
    }, [data]);

    return (
        <Body>
            <Navbar>
                <></>
            </Navbar>
            <EventCreate text="이벤트 수정">
                <EventName></EventName>
                <EventDay></EventDay>
                <EventTime></EventTime>
                <EventDue></EventDue>
                <EventColor></EventColor>
                <EventExplain></EventExplain>
            </EventCreate>
            <Footer>
                <LinkBtn text="수정 완료!" href="/" color={true}></LinkBtn>
                <LinkBtn
                    text="이벤트 삭제하기"
                    href="/"
                    color={false}
                    Click={DeleteEvent}
                ></LinkBtn>
            </Footer>
        </Body>
    );
};

export const getServerSideProps: GetServerSideProps = async(context) => {
    try {
        return {
            props: {
                params: context.params
            }
        }
    }
    catch(e){
        console.log(e);
        return {props: {}}
    }
}

export default ReviseEvent;
