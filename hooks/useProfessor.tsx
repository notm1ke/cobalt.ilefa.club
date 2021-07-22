import useSWR from 'swr';
import * as Logger from '../util/logger';

import { RateMyProfessorReport } from '@ilefa/husky';

export type RmpResponse = RateMyProfessorReport & {
    mostRelevant: string;
}

export interface ProfessorLookupProps {
    rmpIds: string[];
}

export type ProfessorResponse = {
    data: RmpResponse | null;
    isLoading: boolean;
    isError: boolean;
}

export const useProfessor = ({ rmpIds }: ProfessorLookupProps): ProfessorResponse => {

    const start = Date.now();
    const fetcher = (url: string) => fetch(url).then(r => r.json());
    const { data, error } = useSWR(`/api/professor/${rmpIds.join(',')}`, fetcher);

    if (!data && !error) {
        return {
            data: null,
            isLoading: true,
            isError: false
        }
    }

    if (error) {
        Logger.timings('useProfessor', 'Fetch', start, Logger.LogLevelColor.ERROR, 'failed in');
        Logger.debug('useProfessor', `The server responded with an unknown error.`, Logger.LogLevelColor.ERROR);
        
        return {
            data: null,
            isLoading: false,
            isError: true
        }
    }

    if (data && data.message) {
        Logger.timings('useProfessor', 'Fetch', start, Logger.LogLevelColor.ERROR, 'failed in');
        Logger.debug('useProfessor', `The server responded with: ${data?.message}`, Logger.LogLevelColor.ERROR);

        return {
            data: null,
            isLoading: false,
            isError: true
        }
    }

    Logger.timings('useProfessor', 'Fetch', start);
    Logger.debug('useProfessor', 'Server response:', undefined, undefined, data);
    return {
        data: data,
        isLoading: false,
        isError: false
    }

}