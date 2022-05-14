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
    CompleteRoomPayload,
    createRemoteHook,
    UnshapedApiResponse 
} from '../util';

type BuildingResponse = UnshapedApiResponse & {
    buildings: BuildingPayload[];
}

type BuildingShapedResponse = [
    BuildingPayload[] | null,  // data
    boolean,                   // loading
    boolean                    // error
];

export type BuildingPayload = {
    code: string;
    name: string;
    rooms: CompleteRoomPayload[];
}

export const useBuildings = (): BuildingShapedResponse =>
    createRemoteHook<BuildingResponse, BuildingShapedResponse>('Buildings', `/api/buildings`,
        (type, data, _err, _url) => {
            switch (type) {
                case ApiResponseType.ERROR:
                    return [null, false, true];
                case ApiResponseType.LOADING:
                    return [null, true, false];
                case ApiResponseType.SUCCESS:
                    return [data!.buildings, false, false];
            }
        });
