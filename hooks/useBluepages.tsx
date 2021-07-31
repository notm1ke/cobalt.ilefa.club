import useSWR from 'swr';
import * as Logger from '../util/logger';

import { replaceAll, TimedRequest } from '../util';
import { BluepagesRecord } from '@ilefa/bluepages';

export type BluepagesResponsePayload = BluepagesRecord & TimedRequest;

export interface BluepagesQueryProps {
    name: string;
}

export type BluepagesResponse = {
    data: BluepagesResponsePayload | null;
    request: string;
    isLoading: boolean;
    isError: boolean;
}

export const useBluepages = ({ name }: BluepagesQueryProps): BluepagesResponse => {

    const start = Date.now();
    const url = `/api/bluepages/${replaceAll(name, /\s/, '_').toLowerCase()}`;
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
        Logger.timings('useBluepages', 'Fetch', start, Logger.LogLevelColor.ERROR, 'failed in');
        Logger.debug('useBluepages', `The server responded with an unknown error.`, Logger.LogLevelColor.ERROR);
        
        return {
            data: null,
            request: url,
            isLoading: false,
            isError: true
        }
    }

    if (data && data.message) {
        Logger.timings('useBluepages', 'Fetch', start, Logger.LogLevelColor.ERROR, 'failed in');
        Logger.debug('useBluepages', `The server responded with: ${data?.message}`, Logger.LogLevelColor.ERROR);

        return {
            data: null,
            request: url,
            isLoading: false,
            isError: true
        }
    }

    Logger.timings('useBluepages', 'Fetch', start);
    Logger.debug('useBluepages', 'Server response:', undefined, undefined, data);
    return {
        data,
        request: url,
        isLoading: false,
        isError: false
    }

}