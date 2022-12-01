import styled from "styled-components";
import Image from "next/image";
import user from "../../../public/assets/user.svg";
import share from "../../../public/assets/share.svg";
import Link from "next/link";

interface Props {
    userNum: number;
    title: string;
    id: number;
}

interface EventContainerProps {
    backgroundColor: string;
}

export const EventBox = ({ userNum, id, title }: Props) => {
    const backgroundColors: string[] = [
        "#FFE86D",
        "#A1EAD8",
        "#FFBDBD",
        "#8AD4FD",
        "#BEA5F3",
    ];

    const backgroundColor = backgroundColors[id % 5];
    return (
        <Link href={`/event/${id}/view`}>
            <a>
                <EventContainer backgroundColor={backgroundColor}>
                    <IconContainer>
                        <Image src={user} alt="user" />
                        {userNum}
                        <Image src={share} alt="share" />
                    </IconContainer>
                    <Clear />
                    <TitleContainer>{title}</TitleContainer>
                    <DueContainer>
                        마감 <DueDate>22-09-30 23:59</DueDate>
                    </DueContainer>
                </EventContainer>
            </a>
        </Link>
    );
};
const EventContainer = styled.div<EventContainerProps>`
    height: 121px;

    background: ${(props) => props.backgroundColor};
    border-radius: 15px;
    margin-bottom: 8px;
`;

const IconContainer = styled.div`
    padding-right: 15px;
    padding-top: 15px;
    display: inline-flex;
    & {
        float: right;
    }
    span:last-child {
        display: block;
        margin-left: 10px !important;
    }
`;

const Clear = styled.div`
    display: table;
    content: "";
    clear: both;
`;

const TitleContainer = styled.h3`
    margin-top: 17px;
    margin-left: 27px;
    font-family: "Pretendard";
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 2px;
`;

const DueContainer = styled.div`
    font-family: "Pretendard";
    font-weight: 700;
    font-size: 12px;
    line-height: 150%;
    margin-left: 27px;
`;

const DueDate = styled.p`
    margin: 0;
    display: inline-block;
    font-weight: 400;
    font-size: 12px;
`;
