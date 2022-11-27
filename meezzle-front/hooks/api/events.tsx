import { useQuery } from '@tanstack/react-query';
import * as api from '../../api/event';

export const useEvent = () => {
    return useQuery(['event'], () => api.getEvent());
}