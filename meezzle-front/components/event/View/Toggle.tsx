import styled from "styled-components";
import Image from "next/image";
import Polygon from "../../../public/assets/polygon.svg";
import { MouseEvent, useState } from "react";

// 금요일에 만나서 결정
type Props = {
    toggleTime: {
        weekday: string;
        time: string;
        attendee: string[];
        absentee: string[];
    };
};

const Toggle: React.FC<Props> = ({ toggleTime }: Props) => {
    const [clicked, setClicked] = useState<boolean>(false);

    const toggleClick = (event: MouseEvent) => {
        event.stopPropagation();
        setClicked(!clicked);
    };
    return (
        <ToggleContainer>
            <Container onClick={toggleClick}>
                <Image src={Polygon} width={9} height={9} />
                <P>
                    {toggleTime.weekday} {toggleTime.time}
                </P>
            </Container>
            {clicked && (
                <>
                    <FlexContainer>
                        <AttendeeBox>가능한 사람</AttendeeBox>
                        <AttendeeList>
                            {toggleTime.attendee.map((el, idx) => {
                                return toggleTime.attendee.length - 1 === idx
                                    ? el
                                    : `${el},`;
                            })}
                        </AttendeeList>
                    </FlexContainer>
                    <FlexContainer>
                        <AttendeeBox>불가능한 사람</AttendeeBox>
                        <AttendeeList>
                            {toggleTime.absentee.map((el, idx) => {
                                return toggleTime.absentee.length - 1 === idx
                                    ? el
                                    : `${el},`;
                            })}
                        </AttendeeList>
                    </FlexContainer>
                </>
            )}
        </ToggleContainer>
    );
};

export default Toggle;

const ToggleContainer = styled.div``;

const P = styled.p`
    display: inline-block;
    margin: 6px 0px;
`;

const AttendeeBox = styled.div`
    font-size: 13px;
    width: 90px;
`;

const FlexContainer = styled.div`
    display: flex;
    margin-left: 20px;
    align-items: flex-end;
    margin-top: 2.5px;
    margin-bottom: 2.5px;
    color: #7c7c7c;
`;

const AttendeeList = styled.p`
    margin: 0;
    font-size: 13px;
    font-family: "Pretendard";
`;

const Container = styled.div`
    cursor: pointer;
`;
