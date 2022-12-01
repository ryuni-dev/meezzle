import InputText from "../CreateElement/InputText";
import TextBlackMedium from "../../common/TextBlackMedium";
import ContainerInput from "../CreateElement/ContainerInput";
import { useRecoilState, useSetRecoilState } from "recoil";
import { btnDisable, eventName, inputStage } from "../../../states/eventCreate";
import { useEffect, useRef } from "react";
import { eventInfo } from "../../../states/eventInfo";
// import useFocus from "../../../hooks/useFocus";

interface Props {
    inputRef?: any;
}

const EventName = ({inputRef}: Props)=> {
    const [event, setEvent] = useRecoilState(eventInfo);
    // const [name, setName] = useRecoilState(eventName);
    const [disable, setDisable] = useRecoilState(btnDisable);
    const setStage = useSetRecoilState(inputStage);

    const OnChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
        setEvent({
                ...event,
                title: e.target.value,
        })
        if(e.target.value === ''){
            setDisable(true);
        }
        else {
            setDisable(false);
        }
    }

    const OnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if((e.key === 'Enter') && (!disable)) {
            setStage((st) => st + 1);
        }
    }


    return (
        <ContainerInput>
            <TextBlackMedium text='이벤트 명'></TextBlackMedium>
            <InputText placeholder='이벤트 명을 입력해 주세요.' input={event.title} OnChange={OnChange} ref={inputRef} OnKeyPress={OnKeyPress}></InputText>
        </ContainerInput>
    );
}


export default EventName;