import type { NextComponentType } from "next"
import InputText from "../InputText";
import TextBlackMedium from "../../common/TextBlackMedium";

const EventName: NextComponentType = (props: any)=> {
    return (
        <>
            <TextBlackMedium text='이벤트 명'></TextBlackMedium>
            <InputText text='이벤트 명을 입력해 주세요.'></InputText>
        </>
    );
}

export default EventName;