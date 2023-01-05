import { useRecoilState } from "recoil";

import InputTextLarge from "../CreateElement/InputTextLarge";
import TextBlackMedium from "../../common/TextBlackMedium";
import TextGraySmall from "../../common/TextGraySmall";
import ContainerInput from "../CreateElement/ContainerInput";
import { eventInfo } from "../../../states/eventInfo";

const EventExplain = () => {
    const [event, setEvent] = useRecoilState(eventInfo);
    const OnChange = (e: React.FormEvent<HTMLTextAreaElement>): void => {
        setEvent({
            ...event,
            description: e.currentTarget.value,
        });
    };

    return (
        <ContainerInput>
            <TextBlackMedium text="설명"></TextBlackMedium>
            <TextGraySmall text="이벤트에 대한 설명을 적어주세요."></TextGraySmall>
            <InputTextLarge
                placeholder="내용을 입력해주세요."
                input={event.description}
                OnChange={OnChange}
            ></InputTextLarge>
        </ContainerInput>
    );
};

export default EventExplain;
