import React, { ReactNode } from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";

type ViewTableProps = {
    info: {
        row: number;
        col: { length: number; names: string[] };
    };
};

const ViewTable = ({ info }: ViewTableProps, r: number) => {
    const [rows, setRows] = useState<ReactNode[]>([]);
    const [head, setHead] = useState<ReactNode[]>([]);

    useEffect(() => {
        const makeRows = (info: any, r: number) => {
            return (
                <div key={r}>
                    {info.col.names.map((_: string, idx: number) => {
                        return (
                            <TimeBlock
                                col={info.col.length}
                                key={(idx + 1) * 100 + r}
                            >
                                {(idx + 1) * 100 + r}
                            </TimeBlock>
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
                return <td key={idx}>{e}</td>;
            })
        );
    }, []);

    return (
        <Container>
            <Time>
                <p>오전 12:00</p>
                <p>1:00</p>
                <p>2:00</p>
                <p>3:00</p>
                <p>4:00</p>
            </Time>
            <Table>
                <TableHead>{head}</TableHead>
                <TableBody>{rows}</TableBody>
            </Table>
        </Container>
    );
};

export default ViewTable;

const Container = styled.div`
    width: 90%;
    background-color: blue;
    margin: 0 auto;
    font-family: ;
`;

const Table = styled.div`
    display: inline-block;
    width: 88%;
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

const TimeBlock = styled.span<{ col: number }>`
    display: block;
    width: ${(props) => (props.col ? `${100 / props.col}%` : "10%")};
    text-align: center;
    border: 0.5px solid black;
`;

const Time = styled.div`
    display: inline-block;
    width: 12%;
    background-color: red;
    font-size: 9px;
    margin-top: 14px;
`;
