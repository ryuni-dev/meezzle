import type { NextComponentType } from "next"
import styled from 'styled-components';
import { DateContainer, DateSelectText, GrayText, H2, Input, InputDate } from "../../../styled-components/StyledCreate";


const EventTime: NextComponentType = ()=> {
    return (
        <>
            <H2>시간</H2>
            <GrayText>선택할 수 있는 시간대를 입력해주세요.(24시간 기준)</GrayText>
            <DateContainer>
                <InputDate type="time" id="startTime"></InputDate>
                <DateSelectText>~</DateSelectText>
                <InputDate type="time" id="endTime"></InputDate>
            </DateContainer>
        </>
    );
}

export default EventTime;