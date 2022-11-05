import type { NextComponentType } from "next"
import styled from 'styled-components';
import InputTextLarge from "../InputTextLarge";
import TextBlackMedium from "../../common/TextBlackMedium";

import TextGraySmall from "../../common/TextGraySmall";

const EventExplain: NextComponentType = ()=> {
    return (
        <>
            <TextBlackMedium text='이벤트 명'></TextBlackMedium>
            <TextGraySmall text='이벤트에 대한 설명을 적어주세요.'></TextGraySmall>
            <InputTextLarge text="내용을 입력해주세요."></InputTextLarge>
    </>
    );
}

export default EventExplain;