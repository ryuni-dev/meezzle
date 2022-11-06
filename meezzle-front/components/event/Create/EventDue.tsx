import type { NextComponentType } from "next"
import { useRecoilState } from "recoil";

import styled from 'styled-components';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from "date-fns/locale";

import DivRow from "../CreateElement/DivRow";
import TextBlackMedium from "../../common/TextBlackMedium";
import TextGraySmall from "../../common/TextGraySmall";
import ContainerInput from "../CreateElement/ContainerInput";
import { eventDueDate, eventDueTime } from "../../../states/eventCreate";


const DatePickerDiv = styled.div`
    width: 160px;
    margin-right: 1rem;
`
const DatePickerCumstom = styled(DatePicker)`
    width: 160px;
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
const EventDue: NextComponentType = ()=> {
    const [dueDate, setDueDate] = useRecoilState(eventDueDate);
    const [dueTime, setDueTime] = useRecoilState(eventDueTime);

    return (
        <ContainerInput>
            <TextBlackMedium text='마감일 및 마감 시간'></TextBlackMedium>
            <TextGraySmall text='입력 마감일 및 마감 시간을 입력해주세요.'></TextGraySmall>
            <DivRow>
                <DatePickerDiv>
                <DatePickerCumstom
                    dateFormat="yyyy년 MM월 dd일"
                    locale={ko}   
                    selected={dueDate}
                    onChange={(date:Date) => setDueDate(date)}
                    minDate={new Date()}
                    />
                </DatePickerDiv>
                <DatePickerDiv>
                    <DatePickerCumstom
                    locale={ko}   
                    selected={dueTime}
                    onChange={(time:Date) => setDueTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    placeholderText="마감일"
                    timeCaption="마감 시간"
                    dateFormat="마감 시간 : H시 mm분"
                    />
                </DatePickerDiv>
            </DivRow>
        </ContainerInput>
    );
}

export default EventDue;