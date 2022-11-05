import type { NextPage } from "next";
import { useRecoilState } from "recoil";
import styled from 'styled-components';

import EventCreate from "../components/event/Create/EventCreate";
import EventDate from "../components/event/Create/EventDay";
import EventDue from "../components/event/Create/EventDue";
import EventExplain from "../components/event/Create/EventExplain";
import EventName from "../components/event/Create/EventName";
import EventTime from "../components/event/Create/EventTime";
import { createPageState } from "../states/eventCreate";

import EventDay from "../components/event/Create/EventDay";


const SettingPages = (page: number): JSX.Element => {
    switch(page) {
        case 1:
            return <EventName></EventName>
            break;
        case 2: 
            return <EventDate></EventDate>
            break;
        case 3: 
            return <EventTime></EventTime>
            break;
        case 4:
            return <EventDue></EventDue>
            break;
        case 5:
            return <EventExplain></EventExplain>
            break;
        default:
            return <EventName></EventName>;
            break;
    }
} 

const InputManager = ():JSX.Element => {
    return (
        <>
        </>
    )
}

const CreatePage: NextPage = () => {
    const [pageState, setPageState] = useRecoilState(createPageState);

    return (
        <>
            <EventCreate>
                <EventDay></EventDay>
            </EventCreate>
                {/* <EventCreate>
                    {SettingPages(pageState)}
                </EventCreate>
                <DecreaseBtn></DecreaseBtn>
                <IncreaseBtn></IncreaseBtn> */}
        </>
        )
};

export default CreatePage;
