import type { NextComponentType } from "next";
import { useRecoilState } from "recoil";

import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";

import DivRow from "../CreateElement/DivRow";
import TextBlackMedium from "../../common/TextBlackMedium";
import TextGraySmall from "../../common/TextGraySmall";
import ContainerInput from "../CreateElement/ContainerInput";
import { useState } from "react";
import { eventTimeInfo } from "../../../states/eventInfo";
import { ddayDisable } from "../../../states/eventCreate";

interface Props {
    disabled?: boolean | undefined;
}

const DatePickerDiv = styled.div`
    width: 42%;
    margin-right: 1rem;
`;
const DatePickerCumstom = styled(DatePicker)`
    width: 100%;
    height: 48px;

    /* gray100 */

    border: 1px solid #e2e2e2;
    border-radius: 10px;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 13px;

    line-height: 150%;
    /* identical to box height, or 20px */
    margin: 0px;
    letter-spacing: -0.011em;
    text-indent: 15px;

    background-color: ${
        //@ts-ignore
        (props: Props) => {
            props.disabled ? "#686868" : "#FFFFFF";
        }
    };
`;

const CheckContainer = styled.div`
    display: flex;
    flex-direction: column;

    width: 160px;
    height: 42px;
    margin-top: 0.5rem;
`;
const RowBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0.2rem;
`;
const Check = styled.input`
    width: 22px;
    height: 22px;
    background: #ffffff;
    border: 1px solid #e2e2e2;
    border-radius: 2px;
    accent-color: #3278de;
    margin-right: 5px;
`;

const TextMedium = styled.text`
    /* Create_info_re_12 */

    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 150%;
    /* identical to box height, or 18px */

    letter-spacing: -0.011em;

    color: #7c7c7c;
`;

const TextSmall = styled.text`
    /* notice_re_10 */

    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 150%;

    letter-spacing: -0.011em;

    /* gray300 */

    color: #a5a5a5;
`;
const EventDue: NextComponentType = () => {
    const [timeInfo, setTimeInfo] = useRecoilState(eventTimeInfo);
    const [disable, setDisable] = useRecoilState(ddayDisable);

    return (
        <ContainerInput>
            <TextBlackMedium text="마감일 및 마감 시간"></TextBlackMedium>
            <TextGraySmall text="입력 마감일 및 마감 시간을 입력해주세요."></TextGraySmall>
            <DivRow>
                <DatePickerDiv>
                    <DatePickerCumstom
                        dateFormat="yyyy년 MM월 dd일"
                        locale={ko}
                        selected={timeInfo.dueTime}
                        onChange={
                            (date: Date) =>
                                setTimeInfo({
                                    ...timeInfo,
                                    dueTime: date,
                                })
                            // setDueDate(date)
                        }
                        minDate={new Date()}
                        disabled={disable}
                        onFocus={(e) => e.target.blur()}
                    />
                </DatePickerDiv>
                <DatePickerDiv>
                    <DatePickerCumstom
                        locale={ko}
                        selected={timeInfo.dueTime}
                        onChange={
                            (time: Date) =>
                                setTimeInfo({
                                    ...timeInfo,
                                    dueTime: time,
                                })
                            // setDueTime(time)
                        }
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        placeholderText="마감일"
                        timeCaption="마감 시간"
                        dateFormat="마감 시간 : H시 mm분"
                        disabled={disable}
                        onFocus={(e) => e.target.blur()}
                    />
                </DatePickerDiv>
            </DivRow>
            <CheckContainer>
                <RowBox>
                    <Check
                        type="checkbox"
                        onChange={() => setDisable(!disable)}
                        checked={disable ? true : false}
                    ></Check>
                    <TextMedium>선택 안 함</TextMedium>
                </RowBox>
                <TextSmall>* 투표 생성 후에도 마감할 수 있어요.</TextSmall>
            </CheckContainer>
        </ContainerInput>
    );
};

export default EventDue;
