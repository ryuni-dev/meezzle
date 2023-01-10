import type { NextPage } from "next";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";

import { useCallback, useEffect, useRef } from "react";

import EventCreate from "../../components/event/Create/EventCreate";
import EventName from "../../components/event/Create/EventName";
import EventDay from "../../components/event/Create/EventDay";
import EventTime from "../../components/event/Create/EventTime";
import EventDue from "../../components/event/Create/EventDue";
import EventColor from "../../components/event/Create/EventColor";
import EventExplain from "../../components/event/Create/EventExplain";
import Btn from "../../components/common/Btn";
import { btnDisable, ddayDisable, inputStage } from "../../states/eventCreate";
import { eventInfo, eventTimeInfo } from "../../states/eventInfo";
import { eventDaySelected } from "../../states/eventDayBox";
import { Convert4ReqEvents } from "../../utils/converter";
import { useEventCreate_test } from "../../hooks/api/events";
import Body from "../../styled-components/StyledBody";
import { useRouter } from "next/router";
import { HashLoader } from "react-spinners";


const LoaderBox = styled.div`
    margin-top: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
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

    const router = useRouter();

    const resetEvent = useResetRecoilState(eventInfo);
    const resetDays = useResetRecoilState(eventDaySelected);
    const resetTimes = useResetRecoilState(eventTimeInfo);
    const resetStage = useResetRecoilState(inputStage);
    const resetBtn = useResetRecoilState(btnDisable);
    const resetDdayDisable = useResetRecoilState(ddayDisable);

    const [stage, setStage] = useRecoilState(inputStage);
    const [event, setEvent] = useRecoilState(eventInfo);
    const [timeInfo, setTimeInfo] = useRecoilState(eventTimeInfo);
    const [selected, setSelected] = useRecoilState(eventDaySelected);
    const ddayDisableState = useRecoilValue(ddayDisable);

    const nameRef = useRef<HTMLInputElement>();
    const explainRef = useRef<HTMLTextAreaElement>();

    const createEvent = useEventCreate_test();

    const ReverseStackJSX = (stage: number): JSX.Element => {
        return (
            <>
                {stage > 4 ? <EventExplain inputRef={explainRef}></EventExplain> : null}
                {stage > 3 ? <EventColor></EventColor> : null}
                {stage > 2 ? <EventDue></EventDue> : null}
                {stage > 1 ? <EventTime></EventTime> : null}
                {stage > 0 ? <EventDay></EventDay> : null}
                {stage === 0 ? <EventName inputRef={nameRef}></EventName> : null}
                <BottomDiv></BottomDiv>
            </>
        );
    };

    useEffect(() => {
        resetEvent();
        resetDays();
        resetTimes();
        resetStage();
        resetBtn();
        resetDdayDisable();
        nameRef.current && nameRef.current.focus();
    }, []);

    useEffect(() => {
        explainRef.current && explainRef.current.focus();
      });

      useEffect(() => {
        if (stage === 0) {
            nameRef.current && nameRef.current.focus();
        }
      }, [stage]);

    const handleSubmit = useCallback(
        async (data: string) => {
            const res = await createEvent.mutateAsync(data);
            const resultData = await res.data;
            const eid = await resultData.event.id;
            router.push({
                    pathname: `/event/${eid}/congratulations`,
                    query: { voter: "false" },
                });
            },
        [createEvent],
    )

    const ChangeStage = () => {
        if (stage < 5) {
            setStage((st) => st + 1);
        } 
        else if (stage === 5) {
            setStage(-1);
            console.log(ddayDisableState);
            if(ddayDisableState){
                setTimeInfo({
                    ...timeInfo,
                    dueTime: null
                });
            }
            const data = JSON.stringify(
                //@ts-ignore
                Convert4ReqEvents(event, timeInfo, selected)
                // type 수정 필요
            );
            console.log(data);
            handleSubmit(data);
        }
    };

    return (
        <Body>
            {
                createEvent.isLoading
                ?  
                <LoaderBox>
                    <HashLoader color="#3278DE" />
                </LoaderBox>
                : <>
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
                            <Btn
                                Click={ChangeStage}
                                text={BtnText[stage]}
                                useDisable={true}
                                color={true}
                            ></Btn>
                        )}
                    </Footer>
                </>
            }
        </Body>
    );
};

export default CreatePage;
