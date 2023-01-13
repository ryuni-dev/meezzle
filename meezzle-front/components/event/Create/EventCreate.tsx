import styled from "styled-components";
import Header from "../CreateElement/Header";

const Container = styled.div`
    width: 340px;
    height: 100%;
    margin-bottom: 3%;
`;
const BodyDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: auto;
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
