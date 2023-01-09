import { useRecoilState } from "recoil";

import InputTextLarge from "../CreateElement/InputTextLarge";
import TextBlackMedium from "../../common/TextBlackMedium";
import TextGraySmall from "../../common/TextGraySmall";
import ContainerInput from "../CreateElement/ContainerInput";
import { eventInfo } from "../../../states/eventInfo";

interface Props {
    inputRef?: any;
}


const EventExplain = ({inputRef}: Props) => {
    const [event, setEvent] = useRecoilState(eventInfo);
    const onChange = (e: React.FormEvent<HTMLTextAreaElement>): void => {
        setEvent({
            ...event,
            description: e.currentTarget.value,
        });
    };

const onKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if((e.key === 'Enter')) {
        inputRef.current?.blur();
        // (document.activeElement as HTMLElement).blur()
    }
}

    return (
        <ContainerInput>
            <TextBlackMedium text="설명"></TextBlackMedium>
            <TextGraySmall text="이벤트에 대한 설명을 적어주세요."></TextGraySmall>
            <InputTextLarge
                placeholder="내용을 입력해주세요."
                input={event.description}
                OnChange={onChange}
                OnKeyPress={onKeyPress}
                ref={inputRef}
            ></InputTextLarge>
        </ContainerInput>
    );
};

export default EventExplain;
