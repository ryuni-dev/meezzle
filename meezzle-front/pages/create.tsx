import type { NextPage } from "next";
import EventCreate from "../components/event/Create/EventCreate";
import EventDate from "../components/event/Create/EventDate";
import EventExplain from "../components/event/Create/EventExplain";
import EventName from "../components/event/Create/EventName";
import EventTime from "../components/event/Create/EventTime";


const CreatePage: NextPage = () => {
    return (
        <EventCreate>
            <EventTime></EventTime>
        </EventCreate>
        )
};

export default CreatePage;
