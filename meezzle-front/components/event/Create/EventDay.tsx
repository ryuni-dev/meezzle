import type { NextComponentType } from "next"
import styled from 'styled-components';
 
import TextBlackMedium from "../../common/TextBlackMedium";
import TextGraySmall from "../../common/TextGraySmall";
import ContainerInput from "../CreateElement/ContainerInput";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
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
    weight: 40px;
    margin-right: 0.3rem;
`

const DayBox = styled.div`
    width: 40px;
    height: 40px;
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
            setDisable(() => true);
        }
        else {
            setDisable(() => false);
        }
    }
    IsDisable();

    // useEffect(() => {

    // },[selected, curr, removeMode]);

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

    const UpdateCurrent = (start: string, end: string) => {
        if(click){
            setEnd(() => end)
            //@ts-ignore
            setCurr(() => [...CalcLinear({start, end})]);
        }
    }
    const TouchStartEvent = (
        e:React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
        ): void => {
            document.body.style.overflow="hidden";
            document.body.style.touchAction="none";
            document.body.style.userSelect="none";
            try{
                const targetElement = e.currentTarget.getAttribute("data-day");
                setClick(() => true)
                //@ts-ignore
                setStart(() => targetElement);
                setRemoveMode(CheckRemoveMode(start))
                // selected.find(s => parseInt(start) === s) ? setRemoveMode(true) : setRemoveMode(false);
                //@ts-ignore
                setEnd(() => targetElement);
                //@ts-ignore
                UpdateCurrent(start, targetElement)
            }
            catch{
                setClick(() => false)
                console.log('getAtrribute Error!');
            }
    };

    const ClickEvent = (e: React.MouseEvent, index: number) => {
        try{
            const targetElement = e.currentTarget.getAttribute("data-day");
            //@ts-ignore
            if(selected.find(s => parseInt(targetElement) === s)){
                setSelected(() => selected.filter(se => se !== (index+1)))
            }
            else {
                //@ts-ignore
                setSelected(() => [...selected, index+1])
            }
        }
        catch{
            console.log('getAtrribute Error!');
        }
    }

    const MouseMoveEvent = (
        e:React.MouseEvent<HTMLDivElement>): void => {
            try {
                if (click){
                    setRemoveMode(CheckRemoveMode(start))
                    const targetElement = e.currentTarget.getAttribute("data-day");
                    //@ts-ignore
                    UpdateCurrent(start, targetElement);
                }
            }
            catch{
                console.log('getAtrribute Error!');
            }
    };

    const TouchMoveEvent = (
        e:React.TouchEvent<HTMLDivElement>): void => {
            try{
                if (click) {
                    setRemoveMode(CheckRemoveMode(start))
                    const { touches } = e;
                    if (touches && touches.length != 0) {
                        const { clientX, clientY } = touches[0]
                        //@ts-ignore
                        const targetElement:any = document.elementFromPoint(clientX, clientY).getAttribute("data-day");
                        if((parseInt(targetElement) > 0) && (parseInt(targetElement) < 8)){
                            UpdateCurrent(start, targetElement);
                        }
                    }            
                }
            }
            catch{
                console.log('getAtrribute Error!');
            }
    };

    const TouchEndEvent = () => {
        if (click) {
            setRemoveMode(CheckRemoveMode(start))
            if (!removeMode){
                setSelected(() => [...selected, ...curr]) 
            }
            else {
                setSelected(() => selected.filter(se => !curr.includes(se)))
            }
            document.body.style.overflow="";
            document.body.style.touchAction="";
            // document.body.style.userSelect="";
            IsDisable();
            setCurr(() => [...[]]);
            setClick(() => false);
            // setRemoveMode(false);
        } 
    };


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

    useEffect(() => {
        if(click){
            document.addEventListener('mouseup', TouchEndEvent);
            return () => {
                document.removeEventListener('mouseup', TouchEndEvent)
            }
        }
    }, [curr]);

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
                                    FindSelected(index + 1)
                                }
                                current={
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