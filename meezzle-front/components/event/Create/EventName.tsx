import type { NextComponentType } from "next"
import InputText from "../CreateElement/InputText";
import TextBlackMedium from "../../common/TextBlackMedium";
import ContainerInput from "../CreateElement/ContainerInput";

const EventName: NextComponentType = (props: any)=> {
    return (
        <ContainerInput>
            <TextBlackMedium text='이벤트 명'></TextBlackMedium>
            <InputText text='이벤트 명을 입력해 주세요.'></InputText>
        </ContainerInput>
    );
}

export default EventName;