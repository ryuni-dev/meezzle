import type { NextComponentType } from "next"
import InputText from "../CreateElement/InputText";
import TextBlackMedium from "../../common/TextBlackMedium";
import ContainerInput from "../CreateElement/ContainerInput";
import { useRecoilState, useSetRecoilState } from "recoil";
import { btnDisable, eventName } from "../../../states/eventCreate";

const EventName: NextComponentType = (props: any)=> {
    const [name, setName] = useRecoilState(eventName);
    const setDisable = useSetRecoilState(btnDisable);
    const OnChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value);
        setDisable(false);
    }
    return (
        <ContainerInput>
            <TextBlackMedium text='이벤트 명'></TextBlackMedium>
            <InputText placeholder='이벤트 명을 입력해 주세요.' input={name} OnChange={OnChange}></InputText>
        </ContainerInput>
    );
}

export default EventName;