import type { GetServerSideProps, NextPage } from "next";
import { useRecoilState } from "recoil";
import styled from "styled-components";
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
import {
    useEvent,
    useEventDelete,
    useEventPatch,
} from "../../../hooks/api/events";
import { eventInfo, eventTimeInfo } from "../../../states/eventInfo";
import { eventDaySelected } from "../../../states/eventDayBox";
import { useEffect } from "react";
import {
    Convert4ReqEvents,
    Convert4ResEventDays,
    ISO2Date,
} from "../../../utils/converter";
import { ddayDisable } from "../../../states/eventCreate";
import Body from "../../../styled-components/StyledBody";

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
        eid: string;
    };
}

const ReviseEvent: NextPage<Props> = ({ params }) => {
    const { eid } = params;
    const { data, isLoading } = useEvent(eid);
    console.log(data);
    const [days, setDays] = useRecoilState(eventDaySelected);
    const [event, setEvent] = useRecoilState(eventInfo);
    const [timeInfo, setTimeInfo] = useRecoilState(eventTimeInfo);
    const [ddayDisableState, setDdayDisableState] = useRecoilState(ddayDisable);

    const deleteEvent = useEventDelete();
    const patchEvent = useEventPatch(eid);

    const DeleteEvent = () => {
        deleteEvent.mutate(eid);
    };

    const PatchEvent = () => {
        console.log(ddayDisableState)
        if (ddayDisableState) {
            setTimeInfo({
                ...timeInfo,
                dueTime: null,
            });
        }
        const data = JSON.stringify(
            //@ts-ignore
            Convert4ReqEvents(event, timeInfo, days) // type 수정 필요
        );
        patchEvent.mutate(data);
    };

    useEffect(() => {
        if (isLoading) {
            console.log("is loading...");
        } else {
            setEvent({
                ...event,
                title: data.data.event.title,
                color: data.data.event.color,
                description: data.data.event.description,
            });

            let dday = null;

            if (data.data.event.dday !== null) {
                dday = new Date(data.data.event.dday);
            }
            setTimeInfo({
                ...timeInfo,
                startTime: ISO2Date(
                    data.data.selectableParticipleTimes.beginTime
                ),
                endTime: ISO2Date(data.data.selectableParticipleTimes.endTime),
                dueTime: dday,
            });
            const days = Convert4ResEventDays(
                data.data.selectableParticipleTimes.selectedDayOfWeeks
            );
            setDays(days);
        }
    }, [data]);

    useEffect(() => {
        console.log(ddayDisableState)
        if (ddayDisableState) {
            setTimeInfo({
                ...timeInfo,
                dueTime: null,
            });
        }
    }, [ddayDisableState]);

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
                <LinkBtn
                    text="수정 완료!"
                    href="/"
                    color={true}
                    Click={PatchEvent}
                ></LinkBtn>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        return {
            props: {
                params: context.params,
            },
        };
    } catch (e) {
        console.log(e);
        return { props: {} };
    }
};

export default ReviseEvent;
