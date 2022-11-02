import type { NextComponentType } from "next"
import styled from 'styled-components';
import { DateSelectText, GrayText, H2, Input, InputDate } from "../../../styled-components/StyledCreate";

const DateContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 343px;
    height: 48px;
    margin-top: 9px;
`


const EventDate: NextComponentType = ()=> {
    return (
        <>
            <H2>날짜</H2>
            <GrayText>날짜를 입력해주세요(며칠부터 며칠까지 보이게 할 건가요?)</GrayText>
            <DateContainer>
                <InputDate type="date" id="currentMonth" date-placeholder="시작 날짜"></InputDate>
                <DateSelectText>~</DateSelectText>
                <InputDate type="date" id="currentMonth"></InputDate>
            </DateContainer>
        </>
    );
}

export default EventDate;