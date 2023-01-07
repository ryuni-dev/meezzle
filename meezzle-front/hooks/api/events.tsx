import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from "../../api/event";

export const useEvent = (eid: string) => {
    return useQuery(["event", eid], () => api.getEvent(eid), {
        retry: 1,
        refetchOnWindowFocus: false,
        enabled: !!eid,
    });
};

export const useEvents = () => {
    return useQuery(["event"], () => api.getEvents());
};

export const useEventCreate_test = () => {
    return useMutation(["eventCreate"], (data: string) =>
        api.postCreate_test(data)
    );
};

export const useEventDelete = () => {
    return useMutation(["eventDelete"], (eventId: string) =>
        api.deleteEvent(eventId)
    );
};

export const useEventPatch = (eventId: string) => {
    return useMutation(["eventPatch"], (data:string) =>
        api.patchEvent(data, eventId)
    );
};

export const useEventVote4User = (eventId: string) => {
    return useMutation(["eventVote-user"], (data:string) =>
        api.voteEvent4Host(data, eventId)
    );
};

export const useEventVote4Guest = (eventId: string) => {
    return useMutation(["eventVote-guest"], (data:string) =>
        api.voteEvent4Guest(data, eventId)
    );
};