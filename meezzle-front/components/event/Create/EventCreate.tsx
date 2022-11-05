import type { NextComponentType } from "next"
import { useRecoilState } from "recoil";
import styled from 'styled-components';
import { createPageState } from "../../../states/eventCreate";
import ContainerInput from "../CreateElement/ContainerInput";
import Header from "../CreateElement/Header";

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 100%;
    `

type EventCreateProps = {
    children: JSX.Element | JSX.Element[]
}



const EventCreate = ({children}: EventCreateProps)=> {
    return (
        <>
        <Container>
            <Header text='이벤트 생성'>
            </Header>
            <ContainerInput>
                {children}
            </ContainerInput>
            </Container>
        </>
    );
}

export default EventCreate;