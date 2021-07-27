import useSWR from 'swr';
import * as Logger from '../util/logger';

import { RateMyProfessorReport } from '@ilefa/husky';
import { TimedRequest } from '../util';

export type RmpResponse = RateMyProfessorReport & TimedRequest & {
    mostRelevant: string;
}

export interface ProfessorLookupProps {
    rmpIds: string[];
}

export type ProfessorResponse = {
    data: RmpResponse | null;
    request: string;
    isLoading: boolean;
    isError: boolean;
}

export const useProfessor = ({ rmpIds }: ProfessorLookupProps): ProfessorResponse => {

    const start = Date.now();
    const url = `/api/professor/${rmpIds.join(',')}`;
    const fetcher = (url: string) => fetch(url).then(r => r.json());
    const { data, error } = useSWR(url, fetcher);

    if (!data && !error) {
        return {
            data: null,
            request: url,
            isLoading: true,
            isError: false
        }
    }

    if (error) {
        Logger.timings('useProfessor', 'Fetch', start, Logger.LogLevelColor.ERROR, 'failed in');
        Logger.debug('useProfessor', `The server responded with an unknown error.`, Logger.LogLevelColor.ERROR);
        
        return {
            data: null,
            request: url,
            isLoading: false,
            isError: true
        }
    }

    if (data && data.message) {
        Logger.timings('useProfessor', 'Fetch', start, Logger.LogLevelColor.ERROR, 'failed in');
        Logger.debug('useProfessor', `The server responded with: ${data?.message}`, Logger.LogLevelColor.ERROR);

        return {
            data: null,
            request: url,
            isLoading: false,
            isError: true
        }
    }

    Logger.timings('useProfessor', 'Fetch', start);
    Logger.debug('useProfessor', 'Server response:', undefined, undefined, data);
    return {
        data,
        request: url,
        isLoading: false,
        isError: false
    }

}