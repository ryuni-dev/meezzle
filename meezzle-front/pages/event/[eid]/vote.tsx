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
            await voteGuest.mutateAsync(data);
            await router.push({
                pathname: `/event/${eid}/congratulations`,
                query: { voter: "true" },
            });
        },
        [voteGuest]
    );

    const submitHost = useCallback(
        async (data: string) => {
            await voteHost.mutateAsync(data);
            await router.push({
                pathname: `/event/${eid}/congratulations`,
                query: { voter: "true" },
            });
        },
        [voteHost]
    );

    // ?????? ????????? ???????????? ????????? ?????????
    const onVoteSubmit = () => {
        filterDisable();
        const voteData = JSON.stringify({
            //@ts-ignore
            ableDaysAndTimes: ConvertDays4Server(selectedTime),
        });
        console.log(voteData);
        if (isGuest) {
            // Guest ??????
            submitGuest(voteData);
        } else {
            // Host ??????
            // voteHost.mutate(voteData);
            submitHost(voteData);
        }
        /* ?????? API ?????? ?????? */
        // router.push({
        //     pathname: `/event/${eid}/congratulations`,
        //     query: { voter: "true" },
        // });
    };

    useEffect(() => {
        if (voteGuest.isSuccess) {
            guestLogout();
        }
    }, [voteGuest.isSuccess]);

    // ????????? ?????? ????????? ???????????? ????????? ?????????
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
        // console.log(user)
        console.log(localStorage.getItem("name"));

        for (let i = 0; i < eventParticipants.length; i++) {
            if (eventParticipants[i].name === localStorage.getItem("name")) {
                const ableDaysAndTimes = eventParticipants[i].ableDaysAndTimes;
                console.log(ableDaysAndTimes);
                const convertedData = ConvertDays4Client(ableDaysAndTimes);
                setSelectedTime(convertedData);
            }
        }
    };
    useEffect(() => {
        // ????????? ????????? ?????? ?????????
        const dday = Date.parse(data.data.event.dday);

        if (Date.now() > dday) {
            alert("?????? ????????? ?????? ??????????????????.");
            router.push(`/event/${eid}/info`);
        }
        if (localStorage.getItem("token") === null) {
            alert("????????? ????????? ???????????????.");
            router.push(`/event/${eid}/info`);
        }
    }, []);

    const BtnPrint = (): JSX.Element => {
        if (selectedDay.length === 1) {
            return (
                <>
                    <Btn
                        text="????????????!"
                        color={true}
                        useDisable={false}
                        Click={onVoteSubmit}
                    ></Btn>
                    <Btn
                        text="< ????????? ?????? ??????"
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
                        text="?????? ????????? ????????????"
                        color={true}
                        useDisable={false}
                        Click={GoNextDay}
                    ></Btn>
                    <Btn
                        text="< ????????? ?????? ??????"
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
                        text="????????????!"
                        color={true}
                        useDisable={false}
                        Click={onVoteSubmit}
                    ></Btn>
                    <Btn
                        text="< ?????? ????????? ????????????"
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
                        text="?????? ????????? ????????????"
                        Click={GoNextDay}
                        color={true}
                        useDisable={false}
                    ></Btn>
                    <Btn
                        text="< ?????? ????????? ????????????"
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
                                {data.data.event.title} ???????????? | meezzle
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
