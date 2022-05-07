/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import moment from 'moment';

import {
    DiningHallResponse,
    DiningHallType
} from '@ilefa/blueplate';

import {
    ApiResponseType,
    createRemoteHook,
    UnshapedApiResponse
} from '../util';

export interface DiningHallLookupProps {
    hall: keyof typeof DiningHallType | null;
    date?: Date;
    now?: boolean;
    pollTime?: number;
}

export type DiningHallPayload = DiningHallResponse & UnshapedApiResponse & {
    hasMeals: boolean;
};

type DiningHallShapedResponse = [
    DiningHallPayload | null,
    boolean,
    boolean
];

export const useDiningHall = ({ hall, date, now, pollTime }: DiningHallLookupProps): DiningHallShapedResponse => {
    let url = `/api/blueplate?hall=${hall}${!now && date ? `&date=${moment(date).format('MM-DD-YYYY')}` : ''}`;
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
        }, pollTime);
}