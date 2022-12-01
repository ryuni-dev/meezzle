import { useQuery } from '@tanstack/react-query';
import * as api from '../../api/event';

export const useEvent = (eid: string) => {
    return useQuery(['event', eid], () => api.getEvent(eid));
}

export const useEvents = () => {
    return useQuery(['event'], () => api.getEvents());
}