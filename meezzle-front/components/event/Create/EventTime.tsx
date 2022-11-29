import type { NextComponentType } from "next"
import styled from 'styled-components';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from "date-fns/locale";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

import DivRow from "../CreateElement/DivRow";
import TextBlackMedium from "../../common/TextBlackMedium";
import TextGraySmall from "../../common/TextGraySmall";
import ContainerInput from "../CreateElement/ContainerInput";
import { useRecoilState, useRecoilValue } from "recoil";
import { eventEndTime, eventStartTime, inputFocus, inputStage } from "../../../states/eventCreate";
import { useRef } from "react";
import { eventInfo } from "../../../states/eventInfo";

const TextGrayMedium = styled.text`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 150%;
    /* identical to box height, or 24px */

    letter-spacing: -0.011em;

    /* gray600 */

    color: #626262;
    margin-left: 12px;
    margin-right: 8px;
    align-items: center;
    text-align: center;
    padding-top: 16px;
    padding-bottom: 16px;
`
const DatePickerDiv = styled.div`
    width: 40%;
`
const DatePickerCumstom = styled(DatePicker)`
    width: 100%;
    height: 48px;
    background: #FFFFFF;
    /* gray100 */
    border: 1px solid #E2E2E2;
    border-radius: 10px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 150%;
    /* identical to box height, or 20px */
    margin: 0px;
    letter-spacing: -0.011em;
    text-indent: 15px;
`

const EventTime: NextComponentType = ()=> {
    const [event, setEvent] = useRecoilState(eventInfo);
    const [startTime, setStartTime] = useRecoilState(eventStartTime);
    const [endTime, setEndTime] = useRecoilState(eventEndTime);
    // const stage = useRecoilValue(inputStage);
    // const focus = useRecoilValue(inputFocus);

    return (
        <ContainerInput>
            <TextBlackMedium text='시간'></TextBlackMedium>
            <TextGraySmall text='선택할 수 있는 시간대를 입력해주세요.(24시간 기준)'></TextGraySmall>
            <DivRow>
                <DatePickerDiv>
                    <DatePickerCumstom
                    locale={ko}   
                    selected={event.startTime}
                    onChange={(time:Date) => 
                        setEvent({
                            ...event,
                            startTime: time,
                    })
                        // setStartTime(time)
                    }
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    placeholderText="시작 시간"
                    timeCaption="시작 시간"
                    dateFormat="H시 mm분 시작"
                    />
                </DatePickerDiv>
                <TextGrayMedium>~</TextGrayMedium>
                <DatePickerDiv>
                    <DatePickerCumstom
                    locale={ko}   
                    selected={event.endTime}
                    onChange={(time:Date) => 
                        setEvent({
                            ...event,
                            endTime: time,
                    })
                        // setEndTime(time)
                    }
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    placeholderText="마감 시간"
                    timeCaption="마감 시간"
                    dateFormat="H시 mm분 마감"
                    minTime={startTime}
                    maxTime={setHours(setMinutes(new Date(), 30), 23)}
                    />
                </DatePickerDiv>
            </DivRow>
        </ContainerInput>
    );
}

export default EventTime;