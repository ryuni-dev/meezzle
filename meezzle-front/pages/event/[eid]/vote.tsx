import type { GetServerSideProps, NextPage } from "next";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import Navbar from "../../../components/common/Navbar";
import DayBar from "../../../components/event/Vote/DayBar";
import { voteNow } from "../../../states/eventVote";
import { eventDaySelected } from "../../../states/eventDayBox";
import { useEffect } from "react";
import TimeSelect from "../../../components/event/Vote/TimeSelect";
import Btn from "../../../components/common/Btn";
import { useRouter } from "next/router";
import { useEvent } from "../../../hooks/api/events";
import { Convert4ResEventDays } from "../../../utils/converter";
import { guestLogined } from "../../../states/guest";

const Body = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 auto;
    max-width: 400px;
    // padding-left: 1%;
    width: 100%;
    overflow-x: hidden;
`;

const Footer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 120px;
    // margin-left: 12%;
    // margin-right: 0px;
`;

const A = styled.a`
    max-width: 340px;
    width: 80%;
    height: 59px;
`;

interface Props {
    params: {
        eid: string;
    };
}

const ReviseEvent: NextPage<Props> = ({ params }) => {
    const { eid } = params;

    const { data, isLoading } = useEvent(eid);
    // console.log(data);

    const [now, setNow] = useRecoilState(voteNow);
    const [selectedDay, setSelectedDay] = useRecoilState(eventDaySelected);
    const [isGuest, setIsGuest] = useRecoilState(guestLogined);
    const router = useRouter();

    const GoNextDay = (): void => {
        const idx = selectedDay.findIndex((i) => i === now) + 1;
        if (idx >= 0 && idx < selectedDay.length) {
            setNow(selectedDay[idx]);
        }
    };

    const guestLogout = (): void => {
        setIsGuest(false);
        localStorage.removeItem("token");
    };

    // 투표 제출시 발생하는 이벤트 핸들러
    const onVoteSubmit = (): void => {
        if (isGuest) {
            guestLogout();
        }
        /* 제출 API 처리 필요 */
        router.push("/");
    };

    // 이벤트 설명 보기시 발생하는 이벤트 핸들러
    const onViewInfo = (): void => {
        if (isGuest) {
            guestLogout();
        }
        router.push(`/event/${eid}/info`);
    };

    const GoPrevDay = (): void => {
        const idx = selectedDay.findIndex((i) => i === now) - 1;
        if (idx >= 0 && idx < selectedDay.length) {
            setNow(selectedDay[idx]);
        }
    };

    const BtnPrint = (): JSX.Element => {
        if (selectedDay.length === 1) {
            return (
                <>
                    <Btn
                        text="제출하기!"
                        color={true}
                        useDisable={false}
                        Click={onVoteSubmit}
                    ></Btn>
                    <Btn
                        text="< 이벤트 설명 보기"
                        color={false}
                        useDisable={false}
                        Click={onViewInfo}
                    ></Btn>
                </>
            );
        } else if (now === selectedDay[0]) {
            return (
                <>
                    <Btn
                        text="다음 요일로 이동하기"
                        color={true}
                        useDisable={false}
                        Click={GoNextDay}
                    ></Btn>
                    <Btn
                        text="< 이벤트 설명 보기"
                        color={false}
                        useDisable={false}
                        Click={onViewInfo}
                    ></Btn>
                </>
            );
        } else if (now === selectedDay[selectedDay.length - 1]) {
            return (
                <>
                    <Btn
                        text="제출하기!"
                        color={true}
                        useDisable={false}
                        Click={onVoteSubmit}
                    ></Btn>
                    <Btn
                        text="< 이전 요일로 이동하기"
                        color={false}
                        Click={GoPrevDay}
                        useDisable={false}
                    ></Btn>
                </>
            );
        } else {
            return (
                <>
                    <Btn
                        text="다음 요일로 이동하기"
                        Click={GoNextDay}
                        color={true}
                        useDisable={false}
                    ></Btn>
                    <Btn
                        text="< 이전 요일로 이동하기"
                        color={false}
                        Click={GoPrevDay}
                        useDisable={false}
                    ></Btn>
                </>
            );
        }
    };

    // useEffect(() => {
    //     // setNow(selectedDay[0]);
    // },[]);
    useEffect(() => {
        if (!isLoading) {
            const days = Convert4ResEventDays(
                data.data.selectableParticipleTimes.selectedDayOfWeeks
            );
            setSelectedDay(days);
            setNow(days[0]);
        }
    }, [data]);

    return (
        <>
            <Body>
                <Navbar>
                    <></>
                </Navbar>
                <DayBar></DayBar>
                <TimeSelect></TimeSelect>
                <Footer>{BtnPrint()}</Footer>
            </Body>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        return {
            props: {
                params: context.params,
            },
        };
    } catch (e) {
        console.log(e);
        return { props: {} };
    }
};

export default ReviseEvent;
