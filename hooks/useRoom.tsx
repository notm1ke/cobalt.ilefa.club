import useSWR from 'swr';
import * as Logger from '../util/logger';

import { CompleteRoomPayload } from '../util';

export interface RoomLookupProps {
    name: string;
}

export type RoomInspectionResult = {
    data: CompleteRoomPayload | null;
    isLoading: boolean;
    isError: boolean;
}

export const useRoom = (props: RoomLookupProps): RoomInspectionResult => {

    const start = Date.now();
    const fetcher = (url: string) => fetch(url).then(r => r.json());
    const { data, error } = useSWR(`/api/room/${props.name}`, fetcher);

    if (!data && !error) return {
        data: null,
        isLoading: true,
        isError: false
    }
    
    if (error) {
        Logger.timings('useRoom', 'Fetch', start, Logger.LogLevelColor.ERROR, 'failed in');
        Logger.debug('useRoom', `The server responded with an unknown error.`, Logger.LogLevelColor.ERROR);
        
        return {
            data: null,
            isLoading: false,
            isError: true
        }
    }

    if (data && data.message) {
        Logger.timings('useRoom', 'Fetch', start, Logger.LogLevelColor.ERROR, 'failed in');
        Logger.debug('useRoom', `The server responded with: ${data?.message}`, Logger.LogLevelColor.ERROR);

        return {
            data: null,
            isLoading: true,
            isError: true
        }
    }

    Logger.timings('useRoom', 'Fetch', start);
    Logger.debug('useRoom', 'Server response:', undefined, undefined, data);

    return {
        data,
        isLoading: false,
        isError: false
    }

}