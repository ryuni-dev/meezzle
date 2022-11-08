import type { NextComponentType } from "next"
import styled from 'styled-components';
 
import TextBlackMedium from "../../common/TextBlackMedium";
import TextGraySmall from "../../common/TextGraySmall";
import ContainerInput from "../CreateElement/ContainerInput";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { eventDayCurrent, eventDaySelected } from "../../../states/eventDayBox";
import { btnDisable } from "../../../states/eventCreate";

const DaysRow = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: auto;
    margin-top: 1.5rem;
`
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
    // console.log(linear)
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
    const [click, setClick] = useState<boolean>(false);
    const [start, setStart] = useState<string>('');
    const [end, setEnd] = useState<string>('');
    const [removeMode, setRemoveMode] = useState<boolean>(false);
    const [selected, setSelected] = useRecoilState(eventDaySelected);
    const [curr, setCurr] = useRecoilState(eventDayCurrent);

    const setDisable = useSetRecoilState(btnDisable);

    const IsDisable = () => {
        if(selected.length === 0){
            setDisable(true);
        }
        else {
            setDisable(false);
        }
    }
    IsDisable();

    useEffect(() => {
        // console.log(selected)
    },[selected, curr, removeMode]);

    const UpdateCurrent = (start: string, end: string) => {
        if(click){
            setEnd(end)
            setCurr([...CalcLinear({start, end})]);
            // console.log('cur: ', curr);
            // setCurr(...new Set(curr));
        }
    }
    const TouchStartEvent = useCallback((
        e:React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
        ): void => {
            document.body.style.overflow="hidden";
            document.body.style.touchAction="none";
            document.body.style.userSelect="none";

            setClick(() => true)

            try{
                const targetElement = e.currentTarget.getAttribute("data-day");
                setStart(targetElement);
                // console.log('st', start)
                selected.find(s => parseInt(start) === s) ? setRemoveMode(true) : setRemoveMode(false);
                console.log(removeMode)
                setEnd(targetElement);
                UpdateCurrent(start, targetElement)
            }
            catch{
                console.log('getAtrribute Error!');
            }
            // 여기서 뭔가 오류가 있음
    },
    [click, start, end, removeMode, selected]);

    const ClickEvent = (e: React.MouseEvent, index: number) => {
        try{
            const targetElement = e.currentTarget.getAttribute("data-day");
            console.log(selected.find(s => parseInt(targetElement) === s))
            if(selected.find(s => parseInt(targetElement) === s)){
                setSelected(selected.filter(se => se !== (index+1)))
            }
            else {
                setSelected([...selected, index+1])
            }
        }
        catch{
            console.log('getAtrribute Error!');
        }
    }
    const MouseMoveEvent = useCallback((
        e:React.MouseEvent<HTMLDivElement>): void => {
            try {
                const targetElement = e.currentTarget.getAttribute("data-day");
                UpdateCurrent(start, targetElement);
            }
            catch{
                console.log('getAtrribute Error!');
            }
    },
    [end, curr, click, start]);

    const TouchMoveEvent = useCallback((
        e:React.TouchEvent<HTMLDivElement>): void => {
            try{
                const { touches } = e;
                if (touches && touches.length != 0) {
                    const { clientX, clientY } = touches[0]
                    const targetElement:any = document.elementFromPoint(clientX, clientY).getAttribute("data-day");
                    if((parseInt(targetElement) > 0) && (parseInt(targetElement) < 8)){
                        UpdateCurrent(start, targetElement);
                    }
                }            
            }
            catch{
                console.log('getAtrribute Error!');
            }
    },
    [end, curr, click, start]);

    const TouchEndEvent = useCallback((): void => {
        click ? 
        (!removeMode
            ? setSelected([...selected, ...curr]) 
            : setSelected(selected.filter(se => !curr.includes(se))))
        : null;
        document.body.style.overflow="";
        document.body.style.touchAction="";
        // document.body.style.userSelect="";
        IsDisable();
        setCurr([...[]]);
        // setSelected(Array.from(new Set(selected)))
        // console.log(Array.from(new Set(selected)))
        // setSelected([...Array.from(new Set(selected))]);
        // console.log('se', selected);
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
            // console.log('find: ', idx);
            return true;
        }
        else {
            return false;
        }
    };
    useEffect(()=> {
        TouchEndEvent();
    },[selected]);

    return (
        <ContainerInput>
            <TextBlackMedium text='이벤트 요일'></TextBlackMedium>
            <TextGraySmall text='원하는 요일을 선택해 주세요. 드래그로 선택 가능해요.'></TextGraySmall>

            <DaysRow
                onMouseUp={TouchEndEvent} 
                onTouchEnd={TouchEndEvent}
            >
                    {weekArr.map((week:string, index:number) => 
                        <>
                            <DayContainer 
                                onMouseUp={TouchEndEvent} 
                                onTouchEnd={TouchEndEvent}>
                            <DayText>{week}</DayText>
                            <DayBox 
                                key={index + 1} 
                                data-day={index + 1}
                                selected={
                                    // selected.find(s => s === index) || false
                                    FindSelected(index + 1)
                                }
                                current={
                                    // curr.find(c => c === index) || false
                                    FindCurrent(index + 1)
                                }
                                removeMode={removeMode}
                                onMouseDown={TouchStartEvent}
                                onMouseMove={MouseMoveEvent}
                                onMouseUp={TouchEndEvent}
                                onTouchStart={TouchStartEvent}
                                onTouchMove={TouchMoveEvent}
                                onTouchEnd={TouchEndEvent}
                                onTouchCancel={TouchEndEvent}
                                onClick={(e)=> {ClickEvent(e, index)}}
                                ></DayBox>
                            </DayContainer>
                        </>
                    )}
            </DaysRow>
        </ContainerInput>
    );
}

export default EventDay;