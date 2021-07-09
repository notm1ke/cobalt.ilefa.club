import useSWR from 'swr';

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

    const fetcher = (url: string) => fetch(url).then(r => r.json());
    const { data, error } = useSWR(`/api/buildings`, fetcher);

    if (data && data.message) return {
        data: { buildings: null },
        isLoading: false,
        isError: true
    }

    if (data) return {
        data,
        isLoading: false,
        isError: false
    }

    return {
        data,
        isLoading: !data && !error,
        isError: error
    }

}