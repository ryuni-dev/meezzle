import { useQuery } from '@tanstack/react-query';
import * as api from '../../api/event';
import { Events } from '../../types/EventProps';

export const useEvent = (eid: string) => {
    return useQuery(['event', eid], () => api.getEvent(eid));
}

export const useEvents = () => {
    return useQuery(['event'], () => api.getEvents());
}

export const useEvents_test = () => {
    return useQuery(['event'], () => api.getEvents());
}

export const useEventCreate_test = (data: Events) => {
    return useQuery(['eventCreate'], () => api.postCreate_test(data));
}