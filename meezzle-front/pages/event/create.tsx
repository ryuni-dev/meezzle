import type { NextPage } from "next";
import { useRecoilState, useResetRecoilState } from "recoil";
import styled from "styled-components";

import { useEffect, useRef } from "react";

import EventCreate from "../../components/event/Create/EventCreate";
import EventName from "../../components/event/Create/EventName";
import EventDay from "../../components/event/Create/EventDay";
import EventTime from "../../components/event/Create/EventTime";
import EventDue from "../../components/event/Create/EventDue";
import EventColor from "../../components/event/Create/EventColor";
import EventExplain from "../../components/event/Create/EventExplain";
import Btn from "../../components/common/Btn";
import { btnDisable, inputStage } from "../../states/eventCreate";
import LinkBtn from "../../components/common/LinkBtn";
import { eventInfo, eventTimeInfo } from "../../states/eventInfo";
import { eventDaySelected } from "../../states/eventDayBox";
import { Convert4ReqEvents } from "../../utils/converter";
import { useEventCreate_test } from "../../hooks/api/events";

const Body = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
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
    width: 100%;
    height: 90px;
    margin-top: 1rem;
    // margin-left: 10%;
    margin-right: 0px;
    position: fixed;
    bottom: 0;
`;
// const Move = keyframes` 
// from {
//   transform: translateY(0%);
// }
// to {
//   transform: translateY(10%);
// }
//   `;

// const TransitionDiv = styled.div`
//     animation: ${Move} 1s linear forwards infinite;
//     // transition: all 0.6s ease-out;
// `

// const FocusTransitionDiv = styled.div`
//     transition: 0.6s ease-out;
// `

const BottomDiv = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 75px;
`;

const CreatePage: NextPage = () => {
    const BtnText = [
        "요일 선택하러 가기",
        "시간 선택하러 가기",
        "마감일 선택하러 가기",
        "이벤트 색상 선택하러 가기",
        "설명 적으러 가기",
        "이벤트 생성하기!",
    ];

    const resetEvent = useResetRecoilState(eventInfo);
    const resetDays = useResetRecoilState(eventDaySelected);
    const resetTimes = useResetRecoilState(eventTimeInfo);
    const resetStage = useResetRecoilState(inputStage);
    const resetBtn = useResetRecoilState(btnDisable);
    const [stage, setStage] = useRecoilState(inputStage);
    const nameRef = useRef<HTMLInputElement>();

    const [event, setEvent] = useRecoilState(eventInfo);
    const [timeInfo, setTimeInfo] = useRecoilState(eventTimeInfo);
    const [selected, setSelected] = useRecoilState(eventDaySelected);

    const createEvent = useEventCreate_test();

    const ReverseStackJSX = (stage: number): JSX.Element => {
        return (
            <>
                {stage > 4 ? <EventExplain></EventExplain> : null}
                {stage > 3 ? <EventColor></EventColor> : null}
                {stage > 2 ? <EventDue></EventDue> : null}
                {stage > 1 ? <EventTime></EventTime> : null}
                {stage > 0 ? <EventDay></EventDay> : null}
                <EventName inputRef={nameRef}></EventName>
                <BottomDiv>
                </BottomDiv>
            </>
        );
    };

    useEffect(() => {
        nameRef.current?.focus();
    });

    useEffect(() => {
        resetEvent();
        resetDays();
        resetTimes();
        resetStage();
        resetBtn();
    }, []);

    const ChangeStage = () => {
        if (stage < 5) {
            setStage((st) => st + 1);
        } else if (stage === 5) {
            setStage(0);

            const data = JSON.stringify(
                //@ts-ignore
                Convert4ReqEvents(event, timeInfo, selected)    // type 수정 필요
            );
            createEvent.mutate(data);
        }
    };

    return (
        <Body>
            <EventCreate text="이벤트 생성">
                {ReverseStackJSX(stage)}
            </EventCreate>
            <Footer>
                {stage !== 5 ? (
                    <Btn
                        Click={ChangeStage}
                        text={BtnText[stage]}
                        useDisable={true}
                        color={true}
                    ></Btn>
                ) : (
                    <LinkBtn
                        Click={ChangeStage}
                        text={BtnText[stage]}
                        href="/"
                        color={true}
                    ></LinkBtn>
                )}
            </Footer>
        </Body>
    );
};

export default CreatePage;
