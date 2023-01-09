import InputText from "../CreateElement/InputText";
import TextBlackMedium from "../../common/TextBlackMedium";
import ContainerInput from "../CreateElement/ContainerInput";
import { useRecoilState, useSetRecoilState } from "recoil";
import { btnDisable, inputStage } from "../../../states/eventCreate";
import { eventInfo } from "../../../states/eventInfo";

interface Props {
    inputRef?: any;
}

const EventName = ({inputRef}: Props)=> {
    const [event, setEvent] = useRecoilState(eventInfo);
    const [disable, setDisable] = useRecoilState(btnDisable);
    const setStage = useSetRecoilState(inputStage);

    const onChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
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

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if((e.key === 'Enter') && (!disable)) {
            // inputRef.current?.blur();
            (document.activeElement as HTMLElement).blur()
            setStage((st) => st + 1);
        }
    }


    return (
        <ContainerInput>
            <TextBlackMedium text='이벤트 명'></TextBlackMedium>
            <InputText 
                placeholder='이벤트 명을 입력해 주세요.' 
                input={event.title} 
                OnChange={onChange} 
                OnKeyPress={onKeyPress} 
                ref={inputRef}
            ></InputText>
        </ContainerInput>
    );
}


export default EventName;