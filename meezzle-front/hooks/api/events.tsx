import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from "../../api/event";
import { Events } from "../../types/EventProps";

export const useEvent = (eid: string) => {
    return useQuery(["event", eid], () => api.getEvent(eid), {
        retry: 1,
        refetchOnWindowFocus: false,
        enabled: !!eid,
    });
};

// export const useEvents = () => {
//     return useQuery(['event'], () => api.getEvents());
// }

export const useEvents_test = () => {
    return useQuery(["event"], () => api.getEvents_test());
};

export const useEventCreate_test = () => {
    return useMutation(["eventCreate"], (data: string) =>
        api.postCreate_test(data)
    );
};

export const useEventDelete = () => {
    return useMutation(["eventDelete"], (uuid: string) =>
        api.deleteEvent(uuid)
    );
};
