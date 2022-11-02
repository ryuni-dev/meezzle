import type { NextComponentType } from "next"
import styled from 'styled-components';
import { H2, Input } from "../../../styled-components/StyledCreate";

const EventName: NextComponentType = (props: any)=> {
    return (
        <>
            <H2>
                이벤트 명
            </H2>
            <Input placeholder="이벤트 명을 입력해 주세요"></Input>
        </>
    );
}

export default EventName;