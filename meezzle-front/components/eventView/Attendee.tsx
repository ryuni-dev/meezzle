import styled from "styled-components";
import person from "../../public/assets/person.svg";
import Image from "next/image";

type Props = {
    attendeeInfo: {
        attendee: string[];
        total: string[];
    };
};

const Attendee: React.FC<Props> = ({ attendeeInfo }: Props) => {
    return (
        <>
            <FlexContainer style={{ marginBottom: "5px" }}>
                <Image src={person} />
                <AttendeeNum>
                    {attendeeInfo.attendee.length}/{attendeeInfo.total.length}
                </AttendeeNum>
            </FlexContainer>
            <FlexContainer>
                <AttendeeBox>가능한 사람</AttendeeBox>
                <AttendeeList>
                    {attendeeInfo.attendee.map((el, idx) => {
                        return attendeeInfo.attendee.length - 1 === idx
                            ? el
                            : `${el},`;
                    })}
                </AttendeeList>
            </FlexContainer>
            <FlexContainer>
                <AttendeeBox>불가능한 사람</AttendeeBox>
                <AttendeeList>
                    {attendeeInfo.total.map((el, idx) => {
                        return attendeeInfo.total.length - 1 === idx
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
`;

const AttendeeNum = styled.p`
    display: block;
    margin: 0;
    font-size: 13px;
    font-family: "Inter";
`;

const AttendeeBox = styled.div`
    font-size: 13px;
    width: 80px;
`;

const AttendeeList = styled.p`
    margin: 0;
    font-size: 13px;
`;