import { useEffect, useState } from "react";
import ViewTable from "../../../components/event/View/ViewTable";
import Navbar from "../../../components/common/Navbar";
import shareNav from "../../../public/assets/shareNav.svg";
import Image from "next/image";
import H1 from "../../../components/event/View/Title";
import Tooltip from "../../../components/event/View/Tooltip";
import Attendee from "../../../components/event/View/Attendee";
import styled from "styled-components";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useParticipants } from "../../../hooks/api/participants";
import { HashLoader } from "react-spinners";
import {
    ConvertDays4Client,
    Convert4ResEventDays,
    CheckAbleTime,
} from "../../../utils/converter";
import OrangeBtn from "../../../components/common/OrangeBtn";
import { toast } from "react-toastify";
import { HomeBtn } from "../../../components/common/HomeBtn";
import ContainerToast from "../../../components/common/ContainerToast";
import Body from "../../../styled-components/StyledBody";
import Head from "next/head";

type tableInfoType = {
    row: number;
    col: { length: number; names: string[] };
};

/* 페이지 로드시 fetch 해 올 데이터 */
type TimeDataType = {
    time: number; // Table Box의 key와 같은 형식의 시간
    attendee: string[]; // 참여자들
    absentee: string[];
}[];

interface Props {
    params: {
        eid: string;
    };
}

interface VoterData {
    id: string;
    name: string;
    ableDaysAndTimes: string[];
}

const TableView: NextPage<Props> = ({ params }) => {
    const router = useRouter();
    const voterId = router.query.voter ? router.query.voter : "";
    const [voterData, setVoterData] = useState<VoterData[]>([]);
    const [isVoterFetched, setIsVoterFetched] = useState<boolean>(false);
    const { eid } = params;
    const { data, isLoading, isSuccess, isRefetching, refetch } =
        useParticipants(eid);
    const selectableTimes = isLoading
        ? null
        : data.data.selectableParticipleTimes.selectedDayOfWeeks;
    const participateData = isLoading ? null : data.data.eventParticipants;
    const [tableInfo, setTableInfo] = useState<tableInfoType>({
        row: 48,
        col: {
            length: 7,
            names: ["일", "월", "화", "수", "목", "금", "토"],
        },
    });
    const [timeData, setTimeData] = useState<TimeDataType>([]);
    const [clickedTime, setClickedTime] = useState<number | undefined>();
    const [clickedData, setClickedData] = useState<
        TimeDataType[0] | undefined
    >();
    const [isTableDone, setIsTableDone] = useState<boolean>(false);
    const [isAllDone, setIsAllDone] = useState<boolean>(false);
    const [names, setNames] = useState<string[]>([]);
    const [checkableTimes, setCheckableTimes] = useState<number[]>([]);

    useEffect(() => {
        const clicked: TimeDataType[0] | undefined = timeData.find(
            (el) => el.time === clickedTime
        );
        return setClickedData(clicked);
    }, [clickedTime]);

    useEffect(() => {
        refetch();
    }, []);

    // 투표자 개별 통계 전처리
    useEffect(() => {
        if (voterId && !isLoading && !isRefetching) {
            setVoterData(
                participateData.filter((el: any) => {
                    return el.id === voterId;
                })
            );
            setIsVoterFetched(true);
        }
    }, [voterId, isLoading, isRefetching]);

    async function addAttendee(
        attendTimes: number[],
        name: string,
        timeDataTemp: TimeDataType
    ) {
        for (let j = 0; j < attendTimes.length; j++) {
            let flag = false;

            for (let i = 0; i < timeDataTemp.length; i++) {
                if (timeDataTemp[i].time === attendTimes[j]) {
                    timeDataTemp[i].attendee.push(name);
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                timeDataTemp.push({
                    time: attendTimes[j],
                    attendee: [name],
                    absentee: [],
                });
            }
        }
        setTimeData(timeDataTemp);
    }

    function addAbsentee(timeData: TimeDataType, names: string[]) {
        for (let i = 0; i < timeData.length; i++) {
            setTimeData((cur) => {
                const absentees: string[] = names.filter(
                    (name) => timeData[i].attendee.includes(name) === false
                );
                let copy = [...cur];
                const findIndex = cur.findIndex(
                    (el) => el.time === timeData[i].time
                );
                if (findIndex != -1) {
                    copy[findIndex] = {
                        ...copy[findIndex],
                        absentee: absentees,
                    };
                }
                return [...copy];
            });
        }
    }

    useEffect(() => {
        if (isSuccess && !isRefetching) {
            let timeDataTemp: TimeDataType = [];
            const participleTimes = `${data.data.selectableParticipleTimes.beginTime}-${data.data.selectableParticipleTimes.endTime}`;
            const days = Convert4ResEventDays(
                data.data.selectableParticipleTimes.selectedDayOfWeeks
            );
            setCheckableTimes(CheckAbleTime(participleTimes, days));

            if (!isVoterFetched) {
                for (let i = 0; i < participateData.length; i++) {
                    setNames((cur) => {
                        return [...cur, participateData[i].name];
                    });
                    addAttendee(
                        ConvertDays4Client(participateData[i].ableDaysAndTimes),
                        participateData[i].name,
                        timeDataTemp
                    );
                }
                addAbsentee(timeData, names);
                setIsTableDone(true);
            } else {
                setNames([voterData[0].name]);
                addAttendee(
                    ConvertDays4Client(voterData[0].ableDaysAndTimes),
                    voterData[0].name,
                    timeDataTemp
                );
                setIsTableDone(true);
            }
        }
    }, [isSuccess, isVoterFetched, isRefetching]);

    useEffect(() => {
        if (isTableDone) {
            addAbsentee(timeData, names);
            setIsAllDone(true);
        }
    }, [isTableDone]);

    const onShare = () => {
        navigator.clipboard
            .writeText(window.location.href)
            .then(() => {
                toast("링크가 복사되었습니다.", {
                    position: "top-center",
                    autoClose: 1300,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            .catch((err) => {
                console.log("Something went wrong", err);
            });
    };

    const goHome = () => {
        router.push("/");
    };

    const goPrev = () => {
        router.push(`/event/${eid}/info`);
    };

    return (
        <Body>
            {isLoading && (
                <LoaderBox>
                    <HashLoader color="#3278DE" />
                </LoaderBox>
            )}
            {!isLoading && isAllDone && (
                <>
                    <Head>
                        <meta
                            property="og:description"
                            content="링크를 타고 참가자들의 투표 현황을 살펴보세요!"
                        />
                        <title>
                            {isVoterFetched
                                ? `${voterData[0].name}님의 투표 현황 | meezzle`
                                : `${data.data.event.title}
                            투표 현황 | meezzle`}
                        </title>
                    </Head>
                    <Navbar>
                        <></>
                    </Navbar>
                    {!isVoterFetched && (
                        <ContainerToast
                            position="top-center"
                            autoClose={1300}
                            hideProgressBar
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            draggable
                            pauseOnHover={false}
                            theme="light"
                        />
                    )}
                    {isVoterFetched && (
                        <Highlight>
                            <TitleLargeText>
                                {voterData[0].name}님의 투표 결과
                            </TitleLargeText>
                        </Highlight>
                    )}
                    {!isVoterFetched && (
                        <>
                            <H1>총 {participateData.length}명이 참여했어요!</H1>
                            <Tooltip>*시간을 클릭해보세요.</Tooltip>
                        </>
                    )}
                    <ViewTable
                        timeData={timeData}
                        info={tableInfo}
                        setClickedTime={setClickedTime}
                        checkableTimes={checkableTimes}
                        total={isVoterFetched ? 1 : participateData.length}
                    />
                    {clickedData && !isVoterFetched && (
                        <Container>
                            <Attendee clickedData={clickedData} />
                        </Container>
                    )}
                    <Footer fixed={false}>
                        {isVoterFetched ? (
                            <OrangeBtn
                                style={{ filter: "none" }}
                                onClick={goPrev}
                            >
                                이전으로
                            </OrangeBtn>
                        ) : (
                            <OrangeBtn
                                style={{ filter: "none" }}
                                onClick={onShare}
                            >
                                공유하기
                            </OrangeBtn>
                        )}
                        {!isVoterFetched && (
                            <HomeBtn onClick={goHome}>
                                홈으로 돌아갈래요
                            </HomeBtn>
                        )}
                    </Footer>
                    {isVoterFetched && <div style={{ height: "12vh" }}></div>}
                </>
            )}
        </Body>
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

export default TableView;

const Footer = styled.div<{ fixed: boolean }>`
    display: flex;
    position: ${(props) => (props.fixed ? "fixed" : "relative")};
    top: ${(props) => (props.fixed ? "85%" : "")};
    width: ${(props) => (props.fixed ? "320px" : "80%")};
    margin-left: ${(props) => (props.fixed ? "16px" : "0px")};
    margin-top: 30px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    width: 372px;
    background-color: white;
    display: inline-block;
    position: fixed;
    margin: 0 auto;
    top: 83%;
    border: 1px solid gray;
    border-radius: 5px;
    z-index: 2;
`;

const LoaderBox = styled.div`
    margin-top: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Highlight = styled.div`
    margin-bottom: 16px;
    background: linear-gradient(to top, #e3efff 50%, transparent 50%);
    z-index: -1;
`;
const TitleLargeText = styled.text`
    margin-right: 5px;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 19px;
    line-height: 150%;
    /* identical to box height, or 28px */

    letter-spacing: -0.011em;

    color: #000000;
`;
