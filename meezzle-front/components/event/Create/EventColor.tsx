import { useRecoilState } from "recoil";
import styled from "styled-components";

import { eventInfo } from "../../../states/eventInfo";
import TextBlackMedium from "../../common/TextBlackMedium";
import TextGraySmall from "../../common/TextGraySmall";
import ContainerInput from "../CreateElement/ContainerInput";
import DivRow from "../CreateElement/DivRow";

interface ColorProps {
    color?: string;
}
const ColorCheckBox = styled.input.attrs({ type: 'radio' })<ColorProps>`
    appearance: none;
    width: 52px;
    height: 52px;
    border-radius: 100%;
    margin-right: 0.5rem;
    border: 4px double ${(props) => props.color};
    background-color: ${(props) => props.color};

    &:checked {
        appearance: none;
        width: 60px;
        height: 60px;
        border-radius: 100%;
        margin-right: 0.5rem;
        border: 6px double #ffffff;
    }
`
// accent-color: ${//@ts-ignore
//     (props: ColorProps) => {
//     props.color
// }};

// & :before{
//     background: #FFE86D;
// }
// background-color: ${//@ts-ignore
//     (props: ColorProps) => {
//     props.color
// }};
const EventColor = ()=> {
    const colors = ['#ffe86d', '#a1ead8', '#ffbdbd', '#8ad4fd', '#bea5f3'];
    const [event, setEvent] = useRecoilState(eventInfo);
    const OnChange = (bgColor: string): void => { 
        setEvent({
            ...event,
            color: bgColor,
    });
        // setColor(bgColor);
        // console.log(color);
    }
    return (
        <ContainerInput>
            <TextBlackMedium text='이벤트 색상'></TextBlackMedium>
            <TextGraySmall text='이벤트 색상을 선택해주세요.'></TextGraySmall>
            <DivRow>
                {colors.map((bgColor: string, index: number)=>
                <>
                    <ColorCheckBox 
                        type="radio" 
                        name="color" 
                        key={index} 
                        color={bgColor} 
                        onChange={()=> OnChange(bgColor)} 
                        defaultChecked={
                            index === colors.findIndex((el: string) => el === event.color)
                            }>
                    </ColorCheckBox>
                </>
                )}
            </DivRow>
        </ContainerInput>
    );
}

export default EventColor;