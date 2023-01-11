import styled from "styled-components";
import person from "../../../public/assets/person.svg";
import Image from "next/image";

type Props = {
    clickedData?: {
        time: number;
        attendee: string[];
        absentee: string[];
    };
};

const Attendee: React.FC<Props> = ({ clickedData }: Props) => {
    if (clickedData === undefined) return null;
    return (
        <>
            <FlexContainer style={{ marginBottom: "5px" }}>
                <Image src={person} />
                <AttendeeNum>
                    {clickedData.attendee.length}/
                    {clickedData.attendee.length + clickedData.absentee.length}
                </AttendeeNum>
            </FlexContainer>
            <FlexContainer>
                <AttendeeList>
                    <AttendeeBox>가능한 사람</AttendeeBox>
                    {clickedData.attendee.map((el, idx) => {
                        return clickedData.attendee.length - 1 === idx
                            ? el
                            : `${el},`;
                    })}
                </AttendeeList>
            </FlexContainer>
            <FlexContainer>
                <AttendeeList>
                    <AttendeeBox>불가능한 사람</AttendeeBox>
                    {clickedData.absentee.map((el, idx) => {
                        return clickedData.absentee.length - 1 === idx
                            ? el
                            : `${el},`;
                    })}
                </AttendeeList>
            </FlexContainer>
        </>
    );
};

export default Attendee;

const FlexContainer = styled.div`
    display: flex;
    margin-left: 20px;
    align-items: flex-end;
    margin-top: 2.5px;
    margin-bottom: 2.5px;
    font-family: "Pretendard";
    word-wrap: break-word;
`;

const AttendeeNum = styled.p`
    display: block;
    margin: 0;
    font-size: 13px;
    font-family: "Inter";
`;

const AttendeeBox = styled.span`
    font-size: 13px;
    margin-right: 16px;
    /* width: 90px; */
`;

const AttendeeList = styled.p`
    margin: 0;
    font-size: 13px;
    /* word-wrap: break-word; */
    word-break: break-all;
    white-space: pre-line;
`;
