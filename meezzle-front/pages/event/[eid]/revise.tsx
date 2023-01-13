import type { GetServerSideProps, NextPage } from "next";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import Head from "next/head";

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
import { HashLoader } from "react-spinners";
import Btn from "../../../components/common/Btn";
import { useRouter } from "next/router";

const Footer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 120px;
    margin-right: 0px;
`;

const LoaderBox = styled.div`
    margin-top: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface Props {
    params: {
        eid: string;
    };
}

const ReviseEvent: NextPage<Props> = ({ params }) => {
    const { eid } = params;
    const router = useRouter();
    const { data, isLoading } = useEvent(eid);
    const [days, setDays] = useRecoilState(eventDaySelected);
    const [event, setEvent] = useRecoilState(eventInfo);
    const [timeInfo, setTimeInfo] = useRecoilState(eventTimeInfo);
    const [ddayDisableState, setDdayDisableState] = useRecoilState(ddayDisable);

    const deleteEvent = useEventDelete();
    const patchEvent = useEventPatch(eid);

    const DeleteEvent = () => {
        if (
            confirm(
                "이벤트를 삭제하면 되돌릴 수 없어요! \n 정말 삭제하실 건가요?"
            ) === true
        ) {
            deleteEvent.mutate(eid);
            alert("삭제되었어요!");
            router.push("/");
        }
    };

    const PatchEvent = () => {
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
        if (!patchEvent.isLoading) {
            alert("수정되었어요!");
            router.push("/");
        }
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
                setDdayDisableState(false);
            } else {
                setDdayDisableState(true);
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
        if (ddayDisableState) {
            setTimeInfo({
                ...timeInfo,
                dueTime: null,
            });
        }
    }, [ddayDisableState]);

    return isLoading ? (
        <LoaderBox>
            <HashLoader color="#3278DE" />
        </LoaderBox>
    ) : (
        <Body>
            <Head>
                <title>{data.data.event.title} 수정하기 | meezzle</title>
            </Head>
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
                <Btn
                    text="수정 완료!"
                    color={true}
                    useDisable={true}
                    Click={PatchEvent}
                ></Btn>
                <Btn
                    text="이벤트 삭제하기"
                    useDisable={true}
                    color={false}
                    Click={DeleteEvent}
                ></Btn>
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
