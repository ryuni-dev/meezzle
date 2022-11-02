import type { NextComponentType } from "next"
import styled from 'styled-components';
import { DateContainer, DateSelectText, GrayText, H2, Input, InputDate } from "../../../styled-components/StyledCreate";


const EventDue: NextComponentType = ()=> {
    return (
        <>
            <H2>마감일 및 마감 시간</H2>
            <GrayText>입력 마감일 및 마감 시간을 입력해주세요.</GrayText>
            <DateContainer>
                <InputDate type="date" id="currentMonth" date-placeholder="시작 날짜"></InputDate>
                <DateSelectText>~</DateSelectText>
                <InputDate type="date" id="currentMonth"></InputDate>
            </DateContainer>
        </>
    );
}

export default EventDue;