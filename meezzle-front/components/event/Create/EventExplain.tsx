import type { NextComponentType } from "next"
import { useRecoilState, useRecoilValue } from "recoil";

import { eventExplain } from "../../../states/eventCreate";
import InputTextLarge from "../CreateElement/InputTextLarge";
import TextBlackMedium from "../../common/TextBlackMedium";
import TextGraySmall from "../../common/TextGraySmall";
import ContainerInput from "../CreateElement/ContainerInput";


const EventExplain: NextComponentType = ()=> {
    const [explain, setExplain] = useRecoilState(eventExplain);
    const OnChange = (e:React.FormEvent<HTMLTextAreaElement>): void => {
        
        setExplain(e.currentTarget.value)
    }
    return (
        <ContainerInput>
            <TextBlackMedium text='설명'></TextBlackMedium>
            <TextGraySmall text='이벤트에 대한 설명을 적어주세요.'></TextGraySmall>
            <InputTextLarge placeholder="내용을 입력해주세요." input={explain} OnChange={OnChange}></InputTextLarge>
        </ContainerInput>
    );
}

export default EventExplain;