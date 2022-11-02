import type { NextComponentType } from "next"
import styled from 'styled-components';
import { GrayText, H2, InputLarge } from "../../../styled-components/StyledCreate";

const EventExplain: NextComponentType = ()=> {
    return (
        <>
            <H2>설명</H2>
            <GrayText>이벤트에 대한 설명을 적어주세요.</GrayText>
            <InputLarge placeholder="내용을 입력해주세요."></InputLarge>
    </>
    );
}

export default EventExplain;