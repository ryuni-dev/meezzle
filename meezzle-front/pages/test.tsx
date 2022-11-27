import { NextPage } from "next";
import { useEffect, useState } from "react";
import ViewTable from "../components/eventView/ViewTable";
import Navbar from "../components/common/Navbar";
import shareNav from "../public/assets/shareNav.svg";
import Image from "next/image";
import H1 from "../components/eventView/Title";
import Tooltip from "../components/eventView/Tooltip";
import Attendee from "../components/eventView/Attendee";

type tableInfoType = {
    row: number;
    col: { length: number; names: string[] };
};

type attendeeInfoType = {
    total: string[];
    attendee: string[];
};

const Test: NextPage = () => {
    const [total, setTotal] = useState<number>(3);
    const [tableInfo, setTableInfo] = useState<tableInfoType>({
        row: 48,
        col: {
            length: 7,
            names: ["일", "월", "화", "수", "목", "금", "토"],
        },
    });
    const [attendeeInfo, setAttendeeInfo] = useState<attendeeInfoType>({
        total: ["상오", "경륜", "영로", "지은", "재훈"],
        attendee: ["상오", "경륜", "영로", "지은"],
    });

    return (
        <>
            <Navbar>
                <Image src={shareNav} alt="share" />
            </Navbar>
            <H1>총 {total}명이 참여했어요!</H1>
            <Tooltip>*시간을 클릭해보세요.</Tooltip>
            <ViewTable info={tableInfo} />
            {<Attendee attendeeInfo={attendeeInfo} />}
        </>
    );
};

export default Test;
