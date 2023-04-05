import type { NextComponentType } from "next";
import styled from "styled-components";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { btnDisable } from "../../../states/eventCreate";
import {
    timeSelected,
    timeCurrent,
    voteNow,
    ableTime,
} from "../../../states/eventVote";

const Container = styled.div`
    display: flex;
    overscroll-behavior-x: none; // 아이폰 스와이프 방지
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
`;
const RowDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    max-width: 360px;
    width: 360px;
    height: auto;
    margin-top: 7px;
    // margin-left: 5%;
`;

const TimeDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    max-width: 360px;
    width: 360px;
    margin-left: -25px;
    height: auto;
    margin-top: 7px;
    // margin-left: 5%;
`;

const DayText = styled.text`
    margin-right: auto;
    margin-left: 2vw;

    /* Home_title_semi_15 */

    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 150%;
    /* identical to box height, or 22px */

    letter-spacing: -0.011em;

    /* gray600 */

    color: #626262;
`;

const TimeText = styled.div`
    // margin-right: 15px;
    width: 56px;
    // margin-left: 10px;
    /* Create_placeholder_re_12 */

    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 150%;
    /* identical to box height, or 18px */

    letter-spacing: -0.011em;
    /* gray200 */

    color: #a3a3a3;
`;

const TimeBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 48px;
    margin-bottom: 23px;
    border-left: 1px solid #ffffff;
    background-color: ${(props: BoxProps) => {
        if (props.disable) {
            return "#686868";
        } else {
            if (props.current) {
                if (!props.removeMode) {
                    return "#3278DE";
                } else {
                    return "#F2F2F2;";
                }
            } else if (props.selected) {
                return "#3278DE";
            } else {
                return "#F2F2F2;";
            }
        }
    }};
    background-image: ${(props: BoxProps) => {
        if (props.disable) {
            return `url("/assets/disable_box.svg")`;
        }
    }};
`;
interface BoxProps {
    selected: boolean;
    current: boolean;
    removeMode: boolean;
    disable: boolean;
}
interface LinearProps {
    start: string;
    end: string;
}
const CalcLinear = (linear: LinearProps): number[] => {
    const Items: number[] = [];
    if (linear.start === null || linear.end === null) {
        return Items;
    }
    const startTime: number = parseInt(linear.start);
    const endTime: number = parseInt(linear.end);

    if (startTime <= endTime) {
        for (let i = startTime; i <= endTime; i++) {
            Items.push(i);
        }
    } else {
        for (let i = endTime; i <= startTime; i++) {
            Items.push(i);
        }
    }
    return Items;
};

const TimeSelect: NextComponentType = () => {
    const time: number[] = [];
    for (let i = 0; i < 6; ++i) {
        time.push(i);
    }
    const boxList: number[] = [];
    for (let i = 0; i < 12; ++i) {
        boxList.push(i);
    }

    const [click, setClick] = useState<boolean>(false);
    const [start, setStart] = useState<string>("");
    const [end, setEnd] = useState<string>("");
    const [removeMode, setRemoveMode] = useState<boolean>(false);
    const [selected, setSelected] = useRecoilState(timeSelected);
    const [curr, setCurr] = useRecoilState(timeCurrent);

    const [nowDay, setNowDay] = useRecoilState(voteNow);
    const ableTimes = useRecoilValue(ableTime);

    const UpdateCurrent = (start: string, end: string) => {
        if (click) {
            setEnd(() => end);
            setCurr(() => [...CalcLinear({ start, end })]);
        }
    };

    const CheckRemoveMode = (start: string) => {
        if (
            selected.find((s) => parseInt(start) === s)
        ){
            return true
        }
        else{
            return false
        }
    }
    const TouchStartEvent =
        (
            e:
                | React.MouseEvent<HTMLDivElement>
                | React.TouchEvent<HTMLDivElement>
        ): void => {
            document.body.style.overflow = "hidden";
            document.body.style.touchAction = "none";
            document.body.style.userSelect = "none";

            try {
                const targetElement = e.currentTarget.getAttribute("data-time");
                const targetDisable =
                    e.currentTarget.getAttribute("data-disable");

                if (targetElement !== null && targetDisable == 'false') {
                    setClick(() => true);
                    setStart(() => targetElement);
                    setRemoveMode(CheckRemoveMode(start))
                    setEnd(() => targetElement);
                    UpdateCurrent(start, targetElement);
                }
            } catch {
                console.log("getAtrribute Error!");
            }
        };

    const ClickEvent = (e: React.MouseEvent, index: number) => {
        try {
            const targetElement = e.currentTarget.getAttribute("data-time");
            const targetDisable = e.currentTarget.getAttribute("data-disable");

            if (targetElement !== null && targetDisable == 'false') {
                if (selected.find((s) => parseInt(targetElement) === s)) {
                    setSelected(() => selected.filter((se) => se !== index));
                } else {
                    setSelected(() => [...selected, index]);
                }
            }
        } catch {
            console.log("getAtrribute Error!");
        }
    };

    const MouseMoveEvent = 
        (e: React.MouseEvent<HTMLDivElement>): void => {
            try {
                if (click) {
                    setRemoveMode(CheckRemoveMode(start))
                    const targetElement = e.currentTarget.getAttribute("data-time");
                    if (targetElement !== null) {
                        UpdateCurrent(start, targetElement);
                    }
                }
            } catch {
                console.log("getAtrribute Error!");
            }
        };

    const TouchMoveEvent = 
        (e: React.TouchEvent<HTMLDivElement>): void => {
            try {
                if (click){
                    setRemoveMode(CheckRemoveMode(start))
                    const { touches } = e;
                    if (touches && touches.length != 0) {
                        const { clientX, clientY } = touches[0];
                        //@ts-ignore
                        const targetElement: any = document
                        .elementFromPoint(clientX, clientY)
                        .getAttribute("data-time");
                        if (
                            parseInt(targetElement) > 100 &&
                            parseInt(targetElement) < 749
                            ) {
                                UpdateCurrent(start, targetElement);
                            }
                        }
                }
            } catch {
                console.log("getAtrribute Error!");
            }
        };

    const TouchEndEvent = () => {
        if (click) {
            setRemoveMode(CheckRemoveMode(start))
            if(!removeMode){
                setSelected(() => [...selected, ...curr])
            }
            else {
                setSelected(() => selected.filter((se) => !curr.includes(se)))
            }
            // : null;
            document.body.style.overflow = "";
            document.body.style.touchAction = "";
            // document.body.style.userSelect="";
            // IsDisable();
            setCurr(() => [...[]]);
            setClick(() => false);
        }
        // setRemoveMode(() => false);
    };

    const FindCurrent = (idx: number): boolean => {
        if (curr.find((c) => c === idx)) {
            return true;
        } else {
            return false;
        }
    };

    const FindSelected = (idx: number): boolean => {
        if (selected.find((s) => s === idx)) {
            return true;
        } else {
            return false;
        }
    };

    const FindIsDisable = (idx: number): boolean => {
        if (ableTimes.find((t) => t === idx)) {
            return false;
        } else {
            return true;
        }
    };
    // useEffect(() => {
    //     TouchEndEvent();
    // }, [selected]);

    return (
        <Container>
            <DayText>{"오전"}</DayText>
            <TimeDiv>
                {time.map((index: number) => (
                    <>
                        <TimeText>{"0" + index + ":00"}</TimeText>
                    </>
                ))}
            </TimeDiv>
            <RowDiv>
                {boxList.map((index: number) => (
                    <>
                        <TimeBox
                            key={nowDay * 100 + index}
                            data-time={nowDay * 100 + index}
                            selected={FindSelected(nowDay * 100 + index)}
                            current={FindCurrent(nowDay * 100 + index)}
                            removeMode={removeMode}
                            disable={FindIsDisable(nowDay * 100 + index)}
                            data-disable={FindIsDisable(nowDay * 100 + index)}
                            onMouseDown={TouchStartEvent}
                            onMouseEnter={MouseMoveEvent}
                            onMouseUp={TouchEndEvent}
                            onTouchStart={TouchStartEvent}
                            onTouchMove={TouchMoveEvent}
                            onTouchEnd={TouchEndEvent}
                            onTouchCancel={TouchEndEvent}
                            onClick={(e) => {
                                ClickEvent(e, nowDay * 100 + index);
                            }}
                        ></TimeBox>
                    </>
                ))}
            </RowDiv>
            <TimeDiv>
                {time.map((index: number) => (
                    <>
                        <TimeText>
                            {("00" + (index + 6)).slice(-2) + ":00"}
                        </TimeText>
                    </>
                ))}
            </TimeDiv>
            <RowDiv>
                {boxList.map((index: number) => (
                    <>
                        <TimeBox
                            key={nowDay * 100 + index + 12}
                            data-time={nowDay * 100 + index + 12}
                            selected={FindSelected(nowDay * 100 + index + 12)}
                            current={FindCurrent(nowDay * 100 + index + 12)}
                            removeMode={removeMode}
                            disable={FindIsDisable(nowDay * 100 + index + 12)}
                            data-disable={FindIsDisable(
                                nowDay * 100 + index + 12
                            )}
                            onMouseDown={TouchStartEvent}
                            onMouseEnter={MouseMoveEvent}
                            onMouseUp={TouchEndEvent}
                            onTouchStart={TouchStartEvent}
                            onTouchMove={TouchMoveEvent}
                            onTouchEnd={TouchEndEvent}
                            onTouchCancel={TouchEndEvent}
                            onClick={(e) => {
                                ClickEvent(e, nowDay * 100 + index + 12);
                            }}
                        ></TimeBox>
                    </>
                ))}
            </RowDiv>
            <DayText>{"오후"}</DayText>
            <TimeDiv>
                {time.map((index: number) => (
                    <>
                        <TimeText>{index + 12 + ":00"}</TimeText>
                    </>
                ))}
            </TimeDiv>
            <RowDiv>
                {boxList.map((index: number) => (
                    <>
                        <TimeBox
                            key={nowDay * 100 + index + 24}
                            data-time={nowDay * 100 + index + 24}
                            selected={FindSelected(nowDay * 100 + index + 24)}
                            current={FindCurrent(nowDay * 100 + index + 24)}
                            removeMode={removeMode}
                            disable={FindIsDisable(nowDay * 100 + index + 24)}
                            data-disable={FindIsDisable(
                                nowDay * 100 + index + 24
                            )}
                            onMouseDown={TouchStartEvent}
                            onMouseEnter={MouseMoveEvent}
                            onMouseUp={TouchEndEvent}
                            onTouchStart={TouchStartEvent}
                            onTouchMove={TouchMoveEvent}
                            onTouchEnd={TouchEndEvent}
                            onTouchCancel={TouchEndEvent}
                            onClick={(e) => {
                                ClickEvent(e, nowDay * 100 + index + 24);
                            }}
                        ></TimeBox>
                    </>
                ))}
            </RowDiv>
            <TimeDiv>
                {time.map((index: number) => (
                    <>
                        <TimeText>{index + 18 + ":00"}</TimeText>
                    </>
                ))}
            </TimeDiv>
            <RowDiv>
                {boxList.map((index: number) => (
                    <>
                        <TimeBox
                            key={nowDay * 100 + index + 36}
                            data-time={nowDay * 100 + index + 36}
                            selected={FindSelected(nowDay * 100 + index + 36)}
                            current={FindCurrent(nowDay * 100 + index + 36)}
                            removeMode={removeMode}
                            disable={FindIsDisable(nowDay * 100 + index + 36)}
                            data-disable={FindIsDisable(
                                nowDay * 100 + index + 36
                            )}
                            onMouseDown={TouchStartEvent}
                            onMouseEnter={MouseMoveEvent}
                            onMouseUp={TouchEndEvent}
                            onTouchStart={TouchStartEvent}
                            onTouchMove={TouchMoveEvent}
                            onTouchEnd={TouchEndEvent}
                            onTouchCancel={TouchEndEvent}
                            onClick={(e) => {
                                ClickEvent(e, nowDay * 100 + index + 36);
                            }}
                        ></TimeBox>
                    </>
                ))}
            </RowDiv>
        </Container>
    );
};

export default TimeSelect;
