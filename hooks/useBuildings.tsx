import useSWR from 'swr';
import * as Logger from '../util/logger';

import { CompleteRoomPayload } from '../util';

export type BuildingPayload = {
    code: string;
    name: string;
    rooms: CompleteRoomPayload[];
}

export type BuildingsResult = {
    data: {
        buildings: BuildingPayload[] | null;
    };
    isLoading: boolean;
    isError: boolean;
}

export const useBuildings = (): BuildingsResult => {

    const start = Date.now();
    const fetcher = (url: string) => fetch(url).then(r => r.json());
    const { data, error } = useSWR(`/api/buildings`, fetcher);

    if (!data && !error) {
        return {
            data: { buildings: [] },
            isLoading: true,
            isError: false
        };
    }

    if (error) {
        Logger.timings('useBuildings', 'Fetch', start, Logger.LogLevelColor.ERROR, 'failed in');
        Logger.debug('useBuildings', `The server responded with an unknown error.`, Logger.LogLevelColor.ERROR);
        
        return {
            data: { buildings: null },
            isLoading: false,
            isError: true
        }
    }

    if (data && data.message) {
        Logger.timings('useBuildings', 'Fetch', start, Logger.LogLevelColor.ERROR, 'failed in');
        Logger.log(Logger.LogLevel.ERROR, 'Dev', `The server responded with: ${data?.message}`);
        return {
            data: { buildings: null },
            isLoading: false,
            isError: true
        }
    }

    Logger.timings('useBuildings', 'Fetch', start);
    Logger.debug('useBuildings', `Server response:`, undefined, undefined, data.buildings);
    return {
        data: { buildings: data.buildings },
        isLoading: false,
        isError: false
    }
}