import styled from 'styled-components';
import Header from "../CreateElement/Header";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    padding-left: 8.5%;
    margin: 0px;
    width: 100%;
    height: 100%;
    margin-bottom: 100px;
    `
const BodyDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: auto;
    // margin-top: 20px;
    padding-left: 16px;
`
type EventCreateProps = {
    children: JSX.Element | JSX.Element[]
}

const EventCreate = ({children}: EventCreateProps)=> {
    return (
        <Container>
            <Header text='이벤트 생성'>
            </Header>
            <BodyDiv>
                {children}
            </BodyDiv>
        </Container>
    );
}

export default EventCreate;