import useSWR from 'swr';
import { StatisticsQueryMode } from '../util';
import * as Logger from '../util/logger';

export type StatisticsResponse = {
    data: {
        courses: number;
        professors: number;
        rooms: number;
        buildings: number;
        assets: number;
    } | null;
    isLoading: boolean;
    isError: boolean;
}

export const useStatistics = (...mode: StatisticsQueryMode[]): StatisticsResponse => {

    const start = Date.now();
    const fetcher = (url: string) => fetch(url).then(r => r.json());
    const { data, error } = useSWR(`/api/statistics?mode=${mode.join(',')}`, fetcher);

    if (!data && !error) {
        return {
            data: null,
            isLoading: true,
            isError: false
        }
    }

    if (error) {
        Logger.timings('useStatistics', 'Fetch', start, Logger.LogLevelColor.ERROR, 'failed in');
        Logger.debug('useStatistics', `The server responded with an unknown error.`, Logger.LogLevelColor.ERROR);
        
        return {
            data: null,
            isLoading: false,
            isError: true
        }
    }

    if (data && data.message) {
        Logger.timings('useStatistics', 'Fetch', start, Logger.LogLevelColor.ERROR, 'failed in');
        Logger.debug('useStatistics', `The server responded with: ${data?.message}`, Logger.LogLevelColor.ERROR);
        return {
            data: null,
            isLoading: true,
            isError: true
        }
    }

    Logger.timings('useStatistics', 'Fetch', start);
    Logger.debug('useStatistics', 'Server response:', undefined, undefined, data);

    return {
        data,
        isLoading: false,
        isError: false
    }

}