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
                <AttendeeBox>가능한 사람</AttendeeBox>
                <AttendeeList>
                    {clickedData.attendee.map((el, idx) => {
                        return clickedData.attendee.length - 1 === idx
                            ? el
                            : `${el},`;
                    })}
                </AttendeeList>
            </FlexContainer>
            <FlexContainer>
                <AttendeeBox>불가능한 사람</AttendeeBox>
                <AttendeeList>
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
`;

const AttendeeNum = styled.p`
    display: block;
    margin: 0;
    font-size: 13px;
    font-family: "Inter";
`;

const AttendeeBox = styled.div`
    font-size: 13px;
    width: 90px;
`;

const AttendeeList = styled.p`
    margin: 0;
    font-size: 13px;
`;
