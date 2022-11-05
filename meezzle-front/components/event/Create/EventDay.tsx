import type { NextComponentType } from "next"
import styled from 'styled-components';

import DivRow from "../CreateElement/DivRow";
import TextBlackMedium from "../../common/TextBlackMedium";
import TextGraySmall from "../../common/TextGraySmall";
import ContainerInput from "../CreateElement/ContainerInput";


const DayText = styled.text`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    /* identical to box height, or 21px */

    letter-spacing: -0.011em;

    /* gray500 */

    color: #7C7C7C;
`

const DayContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: 72px;
    weight: 45px;
    margin-right: 0.3rem;
`

const DayBox = styled.div`
    width: 45px;
    height: 47px;
    /* gray100 */
    border: 1px solid #E2E2E2;
    border-radius: 5px;
`

const EventDay: NextComponentType = ()=> {
    const weekArr = ["일", "월", "화", "수", "목", "금", "토"];
    return (
        <ContainerInput>
            <TextBlackMedium text='이벤트 요일'></TextBlackMedium>
            <TextGraySmall text='원하는 요일을 선택해 주세요. 드래그로 선택 가능해요.'></TextGraySmall>

            <DivRow>
                    {weekArr.map((week, index) => 
                        <>
                            <DayContainer>
                            <DayText>{week}</DayText>
                            <DayBox></DayBox>
                            </DayContainer>
                        </>
                    )}
            </DivRow>
        </ContainerInput>
    );
}

export default EventDay;