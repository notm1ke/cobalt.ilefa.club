/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import { BuildingCode } from '@ilefa/husky';
import { RoomSchedule } from '@ilefa/bluesign';

import {
    ApiResponseType,
    DefaultShapedHook,
    createRemoteHook,
    TimedRequest,
    UnshapedApiResponse
} from '../util';

export interface ManagedSiteQueryProps {
    sites: BuildingCodeKey[];
}

export type ManagedSiteResponsePayload = TimedRequest & UnshapedApiResponse & {
    sites: BluesignSiteResponse[];
};

export type BuildingCodeKey = keyof typeof BuildingCode;

export type BluesignSiteResponse = {
    name: string;
    schedules: RoomSchedule[];
}

export const useManagedSite = ({ sites }: ManagedSiteQueryProps): DefaultShapedHook<ManagedSiteResponsePayload> =>
    createRemoteHook<ManagedSiteResponsePayload, DefaultShapedHook<ManagedSiteResponsePayload>>('Bluesign', `/api/bluesign?site=${sites.join(',')}`,
        (type, data, _err, url) => {
            switch (type) {
                case ApiResponseType.ERROR:
                    return [null, url, false, true];
                case ApiResponseType.LOADING:
                    return [null, url, true, false];
                case ApiResponseType.SUCCESS:
                    return [data!, url, false, false];
            }
        });