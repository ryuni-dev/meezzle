import type { NextComponentType } from "next"
import styled from 'styled-components';

import DivRow from "../CreateElement/DivRow";
import TextBlackMedium from "../../common/TextBlackMedium";
import TextGraySmall from "../../common/TextGraySmall";
import ContainerInput from "../CreateElement/ContainerInput";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { eventDayCurrent, eventDaySelected } from "../../../states/eventDayBox";


const DayText = styled.text`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    /* identical to box height, or 21px */

    letter-spacing: -0.011em;

    /* gray500 */

    color: #7C7C7C;
`

const DayContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: 72px;
    weight: 45px;
    margin-right: 0.3rem;
`

const DayBox = styled.div`
    width: 45px;
    height: 47px;
    /* gray100 */
    border: 1px solid #E2E2E2;
    border-radius: 5px;

    background-color: ${(props:BoxProps) => {
        if (props.current) {
            if (!props.removeMode) {
                return "#3278DE";
            }
            else {
                return  "#ffffff";
            }
        }
        else if (props.selected){
            return "#3278DE";
        }
        else {
            return  "#ffffff";
        }
    }};
`
interface BoxProps {
    selected: boolean;
    current: boolean;
    removeMode: boolean; 
}
interface LinearProps {
    start: string;
    end: string;
}
const CalcLinear = (linear:LinearProps): number[] => {
    console.log(linear)
    const Items: number[] = [];
    if(linear.start === null || linear.end === null){
        return Items;
    }
    const startDay: number = parseInt(linear.start);
    const endDay: number = parseInt(linear.end);


    if (startDay <= endDay) {
        for(let i = startDay; i <= endDay; i++){
                Items.push(i);
        }
    }
    else {
        for(let i = endDay; i <= startDay; i++){
            Items.push(i);
    }
    }
    return Items;
}

const EventDay: NextComponentType = ()=> {
    const weekArr = ["일", "월", "화", "수", "목", "금", "토"];
    const [click, setClick] = useState<boolean>();
    const [start, setStart] = useState<string>();
    const [end, setEnd] = useState<string>();
    const [removeMode, setRemoveMode] = useState<boolean>(false);
    const [selected, setSelected] = useRecoilState(eventDaySelected);
    const [curr, setCurr] = useRecoilState(eventDayCurrent);

    useEffect(() => {
        // console.log(selected)
    },[selected, curr]);

    const UpdateCurrent = (e:React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, start: string, end: string) => {
        if(click){
            setEnd(end)
            setCurr(CalcLinear({start, end}));
        }
    }
    const TouchStartEvent = useCallback((
        e:React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
        ): void => {
            // e.preventDefault();
            setClick(() => true)
            console.log(e.currentTarget.getAttribute('data-day'));
            const targetElement = e.currentTarget.getAttribute("data-day");
            setStart(targetElement);
            selected.find(s => parseInt(start) === s) ? setRemoveMode(true) : setRemoveMode(false);
            setEnd(targetElement);
            UpdateCurrent(e, start, targetElement)
            // 여기서 뭔가 오류가 있음
    },
    [click, start, end, removeMode, selected]);

    const MouseMoveEvent = useCallback((
        e:React.MouseEvent<HTMLDivElement>): void => {
            const targetElement = e.currentTarget.getAttribute("data-day");
            UpdateCurrent(e, start, targetElement);
    },
    [end, curr, click, start]);

    const TouchMoveEvent = useCallback((
        e:React.TouchEvent<HTMLDivElement>): void => {
            // e.preventDefault();
            const { touches } = e;
            if (touches && touches.length != 0) {
                const { clientX, clientY } = touches[0]
                const targetElement = document.elementFromPoint(clientX, clientY).getAttribute("data-day");
                UpdateCurrent(e, start, targetElement);
            }            
    },
    [end, curr, click, start]);
    const TouchEndEvent = useCallback((
        e:React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
        ): void => {
        click ? 
        (!removeMode
            ? setSelected([...selected, ...curr]) 
            : setSelected(selected.filter(se => !curr.includes(se))))
        : null;

        setCurr([]);
        setClick(false);
        setRemoveMode(false);
    },
    [selected, curr, click, removeMode]);

    const FindCurrent = (idx: number): boolean => {
        if(curr.find(c => c === idx)){
            return true;
        }
        else {
            return false;
        }
    };

    const FindSelected = (idx: number): boolean => {
        if (selected.find(s => s === idx)){
            return true;
        }
        else {
            return false;
        }
    };

    return (
        <ContainerInput>
            <TextBlackMedium text='이벤트 요일'></TextBlackMedium>
            <TextGraySmall text='원하는 요일을 선택해 주세요. 드래그로 선택 가능해요.'></TextGraySmall>

            <DivRow>
                    {weekArr.map((week, index) => 
                        <>
                            <DayContainer 
                                onMouseUp={TouchEndEvent} 
                                onTouchEnd={TouchEndEvent}>
                            <DayText>{week}</DayText>
                            <DayBox 
                                key={index} 
                                data-day={index}
                                selected={
                                    FindSelected(index)
                                }
                                current={
                                    FindCurrent(index)
                                }
                                removeMode={removeMode}
                                onMouseDown={TouchStartEvent}
                                onMouseMove={MouseMoveEvent}
                                onMouseUp={TouchEndEvent}
                                onTouchStart={TouchStartEvent}
                                onTouchMove={TouchMoveEvent}
                                onTouchEnd={TouchEndEvent}
                                onTouchCancel={TouchEndEvent}
                                ></DayBox>
                            </DayContainer>
                        </>
                    )}
            </DivRow>
        </ContainerInput>
    );
}

export default EventDay;