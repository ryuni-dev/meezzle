import type { GetServerSideProps, NextPage } from "next";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Navbar from "../../../components/common/Navbar";
import DayBar from "../../../components/event/Vote/DayBar";
import { ableTime, timeSelected, voteNow } from "../../../states/eventVote";
import { eventDaySelected } from "../../../states/eventDayBox";
import { useCallback, useEffect, useState } from "react";
import TimeSelect from "../../../components/event/Vote/TimeSelect";
import Btn from "../../../components/common/Btn";
import { useRouter } from "next/router";
import {
    useEvent,
    useEventVote4Guest,
    useEventVote4Host,
} from "../../../hooks/api/events";
import {
    CheckAbleTime,
    Convert4ResEventDays,
    ConvertDays4Client,
    ConvertDays4Server,
} from "../../../utils/converter";
import { guestLogined } from "../../../states/guest";
import Body from "../../../styled-components/StyledBody";
import { HashLoader } from "react-spinners";
import Head from "next/head";

const LoaderBox = styled.div`
    margin-top: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
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

    const { data, isLoading, isFetching } = useEvent(eid);
    const voteHost = useEventVote4Host(eid);
    const voteGuest = useEventVote4Guest(eid);
    const [isVoted, setIsVoted] = useState<boolean>(false);

    const [now, setNow] = useRecoilState(voteNow);
    const [selectedDay, setSelectedDay] = useRecoilState(eventDaySelected);
    const [selectedTime, setSelectedTime] = useRecoilState(timeSelected);
    const [ableTimes, setAbleTimes] = useRecoilState(ableTime);
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
        localStorage.removeItem("name");
    };

    const filterDisable = () => {
        setSelectedTime(selectedTime.filter((se) => !ableTimes.includes(se)));
    };

    const submitGuest = useCallback(
        async (data: string) => {
            voteGuest.mutate(data, {
                onSuccess: () => router.push({
                        pathname: `/event/${eid}/congratulations`,
                        query: { voter: "true" },
                    }),
                onError: () => {
                    alert("잠시 오류가 생겼어요:( \n다시 제출해 주세요!");
                }
            })
        },
        [voteGuest]
    );

    const submitHost = useCallback(
        async (data: string) => {
            voteHost.mutate(data, {
                onSuccess: () => router.push({
                    pathname: `/event/${eid}/congratulations`,
                    query: { voter: "true" },
                }),
                onError: () => {
                    alert("잠시 오류가 생겼어요:( \n다시 제출해 주세요!");
                }
            })
        },
        [voteHost]
    );

    // 투표 제출시 발생하는 이벤트 핸들러
    const onVoteSubmit = () => {
        filterDisable();
        const voteData = JSON.stringify({
            //@ts-ignore
            ableDaysAndTimes: ConvertDays4Server(selectedTime),
        });
        if (isGuest) {
            // Guest 투표
            submitGuest(voteData);
        } else {
            // Host 투표
            submitHost(voteData);
        }
    };

    useEffect(() => {
        if (voteGuest.isSuccess) {
            guestLogout();
        }
    }, [voteGuest.isSuccess]);

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

    const FindData = () => {
        const eventParticipants = data.data.eventParticipants;

        for (let i = 0; i < eventParticipants.length; i++) {
            if (eventParticipants[i].name === localStorage.getItem("name")) {
                const ableDaysAndTimes = eventParticipants[i].ableDaysAndTimes;
                const convertedData = ConvertDays4Client(ableDaysAndTimes);
                setSelectedTime(convertedData);
            }
        }
    };
    useEffect(() => {
        // 마감일 지나면 투표 못하게
        const dday = Date.parse(data.data.event.dday);

        if (Date.now() > dday) {
            alert("마감 기한이 지난 이벤트입니다.");
            router.push(`/event/${eid}/info`);
        }
        if (localStorage.getItem("token") === null) {
            alert("잘못된 로그인 정보입니다.");
            router.push(`/event/${eid}/info`);
        }
    }, []);

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

    useEffect(() => {
        if (!isLoading) {
            const days = Convert4ResEventDays(
                data.data.selectableParticipleTimes.selectedDayOfWeeks
            );
            const participleTimes =
                data.data.selectableParticipleTimes.beginTime +
                "-" +
                data.data.selectableParticipleTimes.endTime;
            const ableTimeArr = CheckAbleTime(participleTimes, days);
            if (typeof ableTimeArr !== undefined) {
                setAbleTimes(ableTimeArr);
            }
            setSelectedDay(days);
            setNow(days[0]);
            FindData();
        }
    }, [data]);

    return (
        <>
            <Body>
                <Navbar>
                    <></>
                </Navbar>
                {voteGuest.isLoading || voteHost.isLoading ? (
                    <LoaderBox>
                        <HashLoader color="#3278DE" />
                    </LoaderBox>
                ) : (
                    <>
                        <Head>
                            <title>
                                {data.data.event.title} 투표하기 | meezzle
                            </title>
                        </Head>
                        <DayBar></DayBar>
                        <TimeSelect></TimeSelect>
                        <Footer>{BtnPrint()}</Footer>
                    </>
                )}
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
