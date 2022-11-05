import type { NextComponentType } from "next"
import { useRecoilState } from "recoil";
import styled from 'styled-components';
import { inputStage } from "../../../states/eventCreate";
import Btn from "../../common/Btn";
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
const BodyDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 375px;
    height: auto;
    // margin-top: 20px;
    margin-left: 16px;
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
            <BodyDiv>
                {children}
            </BodyDiv>
            </Container>
        </>
    );
}

export default EventCreate;