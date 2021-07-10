import useSWR from 'swr';
import * as Logger from '../util/logger';

import { ProfessorData } from '@ilefa/husky';

export interface ProfessorsLookupProps {
    course: string;
    campus?: string;
}

export type ProfessorsResponse = {
    data: {
        professors: ProfessorData[];
    } | null;
    isLoading: boolean;
    isError: boolean;
}

export const useProfessors = ({ course, campus }: ProfessorsLookupProps): ProfessorsResponse => {

    const start = Date.now();
    const fetcher = (url: string) => fetch(url).then(r => r.json());
    const { data, error } = useSWR(`/api/professors/${course + (campus ? `?campus=${campus}` : '')}`, fetcher);

    if (!data && !error) return {
        data: null,
        isLoading: true,
        isError: false
    }

    if (error) {
        Logger.timings('useProfessors', 'Fetch', start, Logger.LogLevelColor.ERROR, 'failed in');
        Logger.debug('useProfessors', `The server responded with an unknown error.`, Logger.LogLevelColor.ERROR);
        
        return {
            data: null,
            isLoading: false,
            isError: true
        }
    }

    if (data && data.message) {
        Logger.timings('useProfessors', 'Fetch', start, Logger.LogLevelColor.ERROR, 'failed in');
        Logger.debug('useProfessors', `The server responded with ${data?.message}`, Logger.LogLevelColor.ERROR);

        return {
            data: null,
            isLoading: false,
            isError: true
        }
    }

    Logger.timings('useProfessors', 'Fetch', start);
    Logger.debug('useProfessors', `Server response:`, undefined, undefined, data);
    return {
        data,
        isLoading: false,
        isError: false
    }

}