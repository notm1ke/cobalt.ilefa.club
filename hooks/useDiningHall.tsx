import { DiningHallResponse, DiningHallType } from '@ilefa/blueplate';

import {
    ApiResponseType,
    createRemoteHook,
    UnshapedApiResponse
} from '../util';

export interface DiningHallLookupProps {
    hall: keyof typeof DiningHallType | null;
    date: Date | null;
}

export type DiningHallPayload = DiningHallResponse & UnshapedApiResponse;

type DiningHallShapedResponse = [
    DiningHallPayload | null,
    boolean,
    boolean
];

export const useDiningHall = ({ hall, date }: DiningHallLookupProps): DiningHallShapedResponse => { 
    let url = `/api/blueplate?hall=${hall}${date ? `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}` : ''}`;
    if (!hall) url = '/api/noop';

    return createRemoteHook<DiningHallPayload, DiningHallShapedResponse>('DiningHall', url,
        (type, data, _err, _url) => {
            // noop response - component not hydrated yet
            if (data && (data as any).ping)
                return [null, true, false];

            switch (type) {
                case ApiResponseType.ERROR:
                    return [null, false, true];
                case ApiResponseType.LOADING:
                    return [null, true, false];
                case ApiResponseType.SUCCESS:
                    return [data!, false, false];
            }
        });
}