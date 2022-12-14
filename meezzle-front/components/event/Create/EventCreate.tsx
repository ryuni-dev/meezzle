import styled from "styled-components";
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
    margin-bottom: 3%;
`;
const BodyDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: auto;
    // margin-top: 20px;
    padding-left: 2vw;
`;
interface EventCreateProps {
    text: string;
    children: JSX.Element | JSX.Element[];
}

const EventCreate = ({ text, children }: EventCreateProps) => {
    return (
        <Container>
            <Header text={text}>
            </Header>
            <BodyDiv>
                {children}
            </BodyDiv>
        </Container>
    );
};

export default EventCreate;
