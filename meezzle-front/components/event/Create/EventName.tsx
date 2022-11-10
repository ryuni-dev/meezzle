import InputText from "../CreateElement/InputText";
import TextBlackMedium from "../../common/TextBlackMedium";
import ContainerInput from "../CreateElement/ContainerInput";
import { useRecoilState, useSetRecoilState } from "recoil";
import { btnDisable, eventName, inputStage } from "../../../states/eventCreate";
import { useEffect, useRef } from "react";
// import useFocus from "../../../hooks/useFocus";

interface Props {
    inputRef?: any;
}

const EventName = ({inputRef}: Props)=> {
    const [name, setName] = useRecoilState(eventName);
    const [disable, setDisable] = useRecoilState(btnDisable);
    const setStage = useSetRecoilState(inputStage);

    const OnChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value);
        if(e.target.value === ''){
            console.log('aaa')
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
            <InputText placeholder='이벤트 명을 입력해 주세요.' input={name} OnChange={OnChange} ref={inputRef} OnKeyPress={OnKeyPress}></InputText>
        </ContainerInput>
    );
}


export default EventName;