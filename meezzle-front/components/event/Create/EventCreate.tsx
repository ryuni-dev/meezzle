import type { NextComponentType } from "next"
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 100%;
    `
const Header = styled.div`
    display: flex;

    width: 375px;
    height: 44px;
    align-items: center;
    margin-top: 44px;
    margin-left: 16px;

`
const H1 = styled.h1`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
    letter-spacing: -0.011em;
    color: #414141;

    position: absolute;
`

// const H2 = styled.h2`
//     font-family: 'Pretendard';
//     font-style: normal;
//     font-weight: 600;
//     font-size: 16px;
//     line-height: 150%;

//     letter-spacing: -0.011em;

//     /* gray900 */
//     color: #333333;
//     margin: 0px;
// `

const CreateContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 375px;
    height: auto;
    margin-top: 20px;
    margin-left: 16px;
`
// const Input = styled.input`
//     width: 343px;
//     height: 48px;
//     border-radius: 10px;
//     border: 1px solid #E2E2E2;

//     ::placeholder {
//         font-family: 'Pretendard';
//         font-style: normal;
//         font-weight: 400;
//         font-size: 12px;
//         line-height: 150%;
//         /* identical to box height, or 18px */
    
//         letter-spacing: -0.011em;
    
//         /* gray300 */
    
//         color: #A5A5A5;
//         text-indent: 15px;
//     }
//     :focus {
//         outline: none;
//     }
// `

type EventCreateProps = {
    children: JSX.Element | JSX.Element[]
}

const EventCreate = ({children}: EventCreateProps)=> {
    return (
        <Container>
            <Header>
                <H1>
                    이벤트 생성
                </H1>
            </Header>
            <CreateContainer>
                {children}
            </CreateContainer>
        </Container>
    );
}

export default EventCreate;