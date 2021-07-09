import useSWR from 'swr';

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

    const fetcher = (url: string) => fetch(url).then(r => r.json());
    const { data, error } = useSWR(`/api/room/${props.name}`, fetcher);

    if (data && data.message) return {
        data: null,
        isLoading: false,
        isError: true
    }

    if (data) return {
        data,
        isLoading: false,
        isError: false
    }

    return {
        data: null,
        isLoading: !data && !error,
        isError: error
    }

}