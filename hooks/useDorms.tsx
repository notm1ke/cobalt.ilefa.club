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
    Dorm,
    DormHallType,
    UnshapedApiResponse 
} from '../util';

export type DormsResponse = UnshapedApiResponse & {
    types: DormHallType[];
    dorms: Dorm[];
}

type DormsShapedResponse = [
    DormsResponse | null,
    boolean,
    boolean
];

export const useDorms = (): DormsShapedResponse =>
    createRemoteHook<DormsResponse, DormsShapedResponse>('Dorms', `/api/dorms`,
        (type, data, _err, _url) => {
            switch (type) {
                case ApiResponseType.ERROR:
                    return [null, false, true];
                case ApiResponseType.LOADING:
                    return [null, true, false];
                case ApiResponseType.SUCCESS:
                    return [data!, false, false];
            }
        });