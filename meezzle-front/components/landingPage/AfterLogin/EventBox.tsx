import styled from "styled-components";
import Image from "next/image";
import user from "../../../public/assets/user.svg";
import share from "../../../public/assets/share.svg";
import revise from "../../../public/assets/revise.svg";
import Link from "next/link";
interface Props {
    userNum: number;
    title: string;
    eid: number;
    color: string;
    dday: string;
}

interface EventContainerProps {
    backgroundColor: string;
}

export const EventBox = ({ userNum, eid, title, color, dday }: Props) => {

    const checkDday = (dday:string) => {
        if (dday === null) {
            return '설정 되어있지 않아요!'
        }
        else {
            const day = dday.split("T")[0];
            const time = dday.split("T")[1].slice(0,5);
            const dueDay = day + "  " + time;
            return dueDay
        }
    } 

    return (
        <EventContainer backgroundColor={color}>
            <IconContainer>
                <Image src={user} alt="user" />
                {userNum}
                <Link
                    href={{
                        pathname: "/event/[eid]/revise",
                        query: { eid: eid },
                    }}
                >
                    <Image src={revise} alt="revise" />
                </Link>
            </IconContainer>
            <Clear />
            <TitleContainer>{title}</TitleContainer>
            <DueContainer>
                마감 <DueDate>{checkDday(dday)}</DueDate>
            </DueContainer>
        </EventContainer>
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
