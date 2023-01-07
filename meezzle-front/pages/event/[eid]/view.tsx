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
import { ConvertDays4Client } from "../../../utils/converter";

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

const Body = styled.div`
    display: flex;
    max-width: 400px;
    margin: 0 auto;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

interface Props {
    params: {
        eid: string;
    };
}

const TableView: NextPage<Props> = ({ params }) => {
    const router = useRouter();
    const { eid } = params;
    const { data, isLoading, isSuccess } = useParticipants(eid);
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

    useEffect(() => {
        const clicked: TimeDataType[0] | undefined = timeData.find(
            (el) => el.time === clickedTime
        );
        return setClickedData(clicked);
    }, [clickedTime]);

    async function addAttendee(
        attendTimes: number[],
        name: string,
        timeDataTemp: TimeDataType
    ) {
        for (let j = 0; j < attendTimes.length; j++) {
            let flag = false;
            console.log(timeDataTemp.length, timeDataTemp);
            for (let i = 0; i < timeDataTemp.length; i++) {
                console.log(attendTimes[j] === timeDataTemp[i].time);
                if (timeDataTemp[i].time === attendTimes[j]) {
                    console.log("겹치는 시간이 존재합니다");
                    timeDataTemp[i].attendee.push(name);
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                console.log("겹치지 않는 시간입니다");
                timeDataTemp.push({
                    time: attendTimes[j],
                    attendee: [name],
                    absentee: [],
                });
            }
        }
        console.log(name, timeDataTemp);
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
        if (isSuccess) {
            // 참여한 사람 순회
            let timeDataTemp: TimeDataType = [];
            for (let i = 0; i < participateData.length; i++) {
                console.log(participateData[i]);
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
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isTableDone) {
            console.log(timeData);
            addAbsentee(timeData, names);
            setIsAllDone(true);
        }
    }, [isTableDone]);

    useEffect(() => {
        if (isAllDone) {
            console.log(timeData);
        }
    }, [isAllDone]);
    return (
        <Body>
            {isLoading && (
                <LoaderBox>
                    <HashLoader color="#3278DE" />
                </LoaderBox>
            )}
            {!isLoading && isAllDone && (
                <>
                    <Navbar>
                        <Image src={shareNav} alt="share" />
                    </Navbar>
                    <H1>총 {participateData.length}명이 참여했어요!</H1>
                    <Tooltip>*시간을 클릭해보세요.</Tooltip>
                    <ViewTable
                        timeData={timeData}
                        info={tableInfo}
                        setClickedTime={setClickedTime}
                        selectedWeeks={selectableTimes}
                        total={participateData.length}
                    />
                    {clickedData && (
                        <Container>
                            <Attendee clickedData={clickedData} />
                        </Container>
                    )}
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

const Container = styled.div`
    width: 372px;
    background-color: white;
    display: inline-block;
    position: fixed;
    margin: 0 auto;
    top: 85%;
    border: 1px solid gray;
    border-radius: 5px;
`;

const LoaderBox = styled.div`
    margin-top: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
