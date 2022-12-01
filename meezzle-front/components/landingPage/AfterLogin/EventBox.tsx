import styled from "styled-components";
import Image from "next/image";
import user from "../../../public/assets/user.svg";
import share from "../../../public/assets/share.svg";
<<<<<<< HEAD:meezzle-front/components/landingPage/afterLogin/EventBox.tsx
import revise from "../../../public/assets/revise.svg";
import Link from "next/link";
import { useEvent, useEvents } from "../../../hooks/api/events";
import { useRecoilState, useSetRecoilState } from "recoil";
import { eventInfo } from "../../../states/eventInfo";
=======
import Link from "next/link";
>>>>>>> b5e91351350323c7a6b098070be7d259eb000b2e:meezzle-front/components/landingPage/AfterLogin/EventBox.tsx

interface Props {
    userNum: number;
    title: string;
<<<<<<< HEAD:meezzle-front/components/landingPage/afterLogin/EventBox.tsx
    eid: number;
    color: string 
=======
    id: number;
>>>>>>> b5e91351350323c7a6b098070be7d259eb000b2e:meezzle-front/components/landingPage/AfterLogin/EventBox.tsx
}

interface EventContainerProps {
    backgroundColor: string;
}

<<<<<<< HEAD:meezzle-front/components/landingPage/afterLogin/EventBox.tsx
export const EventBox = ({ userNum, eid, title, color }: Props) => {
    // const { data, isFetching, isLoading } = useEvents();
    // const backgroundColors: string[] = [
    //     "#FFE86D",
    //     "#A1EAD8",
    //     "#FFBDBD",
    //     "#8AD4FD",
    //     "#BEA5F3",
    // ];
    // const [ event, setEvent ] = useRecoilState(eventInfo);
    // const Click2Revise = (eid: string) => {
    //     const { data, isFetching, isLoading } = useEvent(eid);
    //     console.log('cl', data);
    //     console.log('aaa')
    //     if(isFetching){
    //         console.log('Fetching...');
    //     }
    //     else {
    //         setEvent({
    //             title: data[0].title,
    //             color: data[0].color,
    //             startTime: data[0].startTime,
    //             endTime: data[0].endTime,
    //             dueDate: data[0].dueDate,
    //             dueTime: data[0].dueTime,
    //             description: data[0].description
    //         });
    //         console.log(event)
    //     }
    // }
    // const backgroundColor = backgroundColors[idx % 5];
    return (
        <EventContainer backgroundColor={color}>
            <IconContainer>
                <Image src={user} alt="user" />
                {userNum}
                <Image src={share} alt="share" />
                <Link 
                    href={{
                        pathname: '/event/[eid]/revise',
                        query: {eid: eid}
                    }}
                >
                    <Image src={revise} alt="revise" />
                </Link>
            </IconContainer>
            <Clear />
            <TitleContainer>{title}</TitleContainer>
            <DueContainer>
                마감 <DueDate>22-09-30 23:59</DueDate>
            </DueContainer>
        </EventContainer>
=======
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
>>>>>>> b5e91351350323c7a6b098070be7d259eb000b2e:meezzle-front/components/landingPage/AfterLogin/EventBox.tsx
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
