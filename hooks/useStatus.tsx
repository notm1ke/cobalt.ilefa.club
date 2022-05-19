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
    CustomUConnServiceReport,
    CustomUConnServiceString,
    UnshapedApiResponse
} from '../util';

export type StatusResponsePayload = UnshapedApiResponse & {
    status: CustomUConnServiceReport[];
}

export type ShapedStatusPayload = [
    CustomUConnServiceReport[] | null,
    boolean,
    boolean
]

export const useStatus = (all = false, ...include: CustomUConnServiceString[]): ShapedStatusPayload =>
    createRemoteHook<StatusResponsePayload, ShapedStatusPayload>('Status', `/api/status?include=${all ? 'all' : include.join(',')}`,
        (type, data, _err, _url) => {
            switch (type) {
                case ApiResponseType.ERROR:
                    return [null, false, true];
                case ApiResponseType.LOADING:
                    return [null, true, false];
                case ApiResponseType.SUCCESS:
                    return [data!.status, false, false];
            } 
        }, 10000);