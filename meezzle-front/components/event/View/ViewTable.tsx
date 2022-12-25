import React, { ReactNode, MouseEvent, TouchEventHandler } from "react";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

type ViewTableProps = {
    info: {
        row: number;
        col: { length: number; names: string[] };
    };
    setClickedTime(key: number): void;
    timeData: {
        times: {
            time: number;
            attendee: string[];
            absentee: string[];
        }[];
        total: number;
    };
};

const ViewTable = ({ info, setClickedTime, timeData }: ViewTableProps) => {
    const [rows, setRows] = useState<ReactNode[]>([]);
    const [head, setHead] = useState<ReactNode[]>([]);
    const [time, setTime] = useState<ReactNode[]>([]);

    const timeClick = (e: MouseEvent<HTMLSpanElement>) => {
        const clickedTime = Number(e.currentTarget.dataset["id"]);
        setClickedTime(clickedTime);
    };

    const getAttendeePercent = (id: number, total: number) => {
        const data = timeData.times.find((el) => el.time === id);
        if (data === undefined || total === 0) return 0;
        return data?.attendee.length === total
            ? 1
            : data?.attendee.length / total;
    };

    const mouseDown = (e: MouseEvent<HTMLSpanElement>) => {
        ref.current = true;
    };

    const mouseMove = (e: MouseEvent<HTMLSpanElement>) => {
        if (!ref.current) return;
        else {
            const clickedTime = Number(e.currentTarget.dataset["id"]);
            setClickedTime(clickedTime);
        }
    };

    const mouseUp = (e: MouseEvent<HTMLSpanElement>) => {
        ref.current = false;
    };

    const touchStart = (e: any) => {
        ref.current = true;
    };

    const touchMove = (e: any) => {
        if (!ref.current) return;
        else {
            const target = document.elementFromPoint(
                e.targetTouches[0].clientX,
                e.targetTouches[0].clientY
            );
            setClickedTime(Number(target?.getAttribute("data-id")));
        }
    };

    const touchEnd = (e: any) => {
        ref.current = false;
    };

    const ref = useRef<boolean>(false);

    useEffect(() => {
        // 가상의 fetch
        // setRows([]);
        const makeRows = (info: any, r: number) => {
            return (
                <div key={r}>
                    {info.col.names.map((_: string, idx: number) => {
                        const key = (idx + 1) * 100 + r;
                        const colorWeight = getAttendeePercent(
                            key,
                            timeData.total
                        );
                        return (
                            <TimeBlock
                                col={info.col.length}
                                key={key}
                                data-id={key}
                                onClick={timeClick}
                                onMouseDown={mouseDown}
                                onMouseUp={mouseUp}
                                onMouseMove={mouseMove}
                                onTouchStart={touchStart}
                                onTouchEnd={touchEnd}
                                onTouchMove={touchMove}
                                colorWeight={colorWeight}
                            ></TimeBlock>
                        );
                    })}
                </div>
            );
        };
        for (let r = 1; r <= info.row; r++) {
            setRows((rows) => [...rows, makeRows(info, r)]);
        }
        setHead(() =>
            info.col.names.map((e: string, idx: number) => {
                return <div key={idx}>{e}</div>;
            })
        );
        for (let i = 0; i <= 24; i++) {
            setTime((time) => [...time, <p key={i}>{i}:00</p>]);
        }
    }, []);

    return (
        <Container>
            <Time>{time}</Time>
            <Table>
                <TableHead>{head}</TableHead>
                <TableBody onMouseLeave={mouseUp}>{rows}</TableBody>
            </Table>
        </Container>
    );
};

export default ViewTable;

const Container = styled.div`
    width: 97%;
    height: 845px;
    margin: 0 auto;
    font-weight: 300;
    font-family: "Pretendard";
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -ms-user-select: none;
`;

const Table = styled.div`
    display: inline-block;
    width: 90%;
    vertical-align: top;
`;

const TableHead = styled.div`
    display: flex;
    justify-content: space-around;

    & > tr {
        display: flex;
        flex: 1;
        justify-content: space-around;
    }
`;

const TableBody = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: column;

    & > div {
        display: flex;
        flex: 1;
        justify-content: space-around;
    }
`;

const TimeBlock = styled.span<{ col: number; colorWeight: number }>`
    display: block;
    width: ${(props) => (props.col ? `${100 / props.col}%` : "10%")};
    background-color: ${(props) =>
        props.colorWeight
            ? `rgba(50, 120, 222,${props.colorWeight})`
            : "#FFFFFF"};
    height: 13px;
    text-align: center;
    border: 0.5px solid black;
`;

const Time = styled.div`
    display: inline-block;
    width: 8%;
    font-size: 9px;
    margin-top: 5px;
    text-align: right;
    margin-right: 3px;

    & > p {
        margin-bottom: 16px;
    }
`;
