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

import { DiningHallResponse } from '@ilefa/blueplate';

import {
    ApiResponseType,
    createRemoteHook,
    TimedRequest,
    UnshapedApiResponse,
} from '../util';

export interface DiningHallSiteLookupProps {
    date?: Date;
    now?: boolean;
}

type BlueplateSiteResponse = TimedRequest & UnshapedApiResponse & {
    halls: DiningHallResponse[];
}

type BlueplateSiteShapedResponse = [
    DiningHallResponse[] | null,
    boolean,
    boolean
];

export const useDiningHallSite = ({ date, now }: DiningHallSiteLookupProps): BlueplateSiteShapedResponse =>
    createRemoteHook<BlueplateSiteResponse, BlueplateSiteShapedResponse>('DiningHalls', `/api/blueplate?mode=site${!now ? `&date=${moment(date).format('MM-DD-YYYY')}` : ''}`,
        (type, data, _err, _url) => {
            switch (type) {
                case ApiResponseType.ERROR:
                    return [null, false, true];
                case ApiResponseType.LOADING:
                    return [null, true, false];
                case ApiResponseType.SUCCESS:
                    return [data!.halls, false, false];
            }
        });