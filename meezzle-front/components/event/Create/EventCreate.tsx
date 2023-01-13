import styled from "styled-components";
import Header from "../CreateElement/Header";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-bottom: 3%;
`;
const BodyDiv = styled.div`
    width: 100%;
    height: auto;
    padding-left: 16px;
`;
interface EventCreateProps {
    text: string;
    children: JSX.Element | JSX.Element[];
}

const EventCreate = ({ text, children }: EventCreateProps) => {
    return (
        <Container>
            <Header text={text}></Header>
            <BodyDiv>{children}</BodyDiv>
        </Container>
    );
};

export default EventCreate;
