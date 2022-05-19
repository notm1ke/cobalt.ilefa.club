/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import {
    ApiResponseType,
    createRemoteHook,
    DiningHallPayload,
    TimedRequest,
    UnshapedApiResponse,
} from '../util';

type BlueplateProps = {
    poll?: number;
}

type CustomDiningHallPayload = DiningHallPayload &  {
    hasMeals: boolean;
}

type BlueplateResponse = TimedRequest & UnshapedApiResponse & {
    halls: CustomDiningHallPayload[];
}

type BlueplateShapedResponse = [
    BlueplateResponse | null,
    boolean,
    boolean
];

export const useDiningHalls = ({ poll }: BlueplateProps): BlueplateShapedResponse =>
    createRemoteHook<BlueplateResponse, BlueplateShapedResponse>('DiningHalls', `/api/blueplate`,
        (type, data, _err, _url) => {
            switch (type) {
                case ApiResponseType.ERROR:
                    return [null, false, true];
                case ApiResponseType.LOADING:
                    return [null, true, false];
                case ApiResponseType.SUCCESS:
                    return [data!, false, false];
            }
        }, poll);