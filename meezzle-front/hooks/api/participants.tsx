import { useQuery } from '@tanstack/react-query';
import * as api from '../../api/participants';

export const useParticipants = () => {
    return useQuery(['participants'], () => api.getParticiapants());
}