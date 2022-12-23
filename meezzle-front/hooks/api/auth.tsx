import { useQuery } from '@tanstack/react-query';
import * as api from '../../api/auth';

export const useTest = () => {
    return useQuery(['auth'], () => api.getAuth());
}