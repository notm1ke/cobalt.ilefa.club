/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import { CampusType } from '@ilefa/husky';
import { ScheduleEntry } from '@ilefa/bluesign';

import {
    ApiResponseType,
    DefaultShapedHook,
    createRemoteHook,
    TimedRequest,
    UnshapedApiResponse,
    CustomScheduleEntry
} from '../util';

export interface BluesignFreeRoomsQueryProps {
    site?: CampusType[];
    pollTime?: number;
}

export type BluesignFreeRoomPayload = {
    room: {
        room: string;
        entries: ScheduleEntry[];
    };
    nextEvents: CustomScheduleEntry[];
}

export type BluesignFreeRoomsResponse = TimedRequest & UnshapedApiResponse & {
    rooms: BluesignFreeRoomPayload[];
    sites: Record<CampusType, number>;
};

export const useFreeRooms = ({ site, pollTime }: BluesignFreeRoomsQueryProps): DefaultShapedHook<BluesignFreeRoomsResponse> =>
    createRemoteHook<BluesignFreeRoomsResponse, DefaultShapedHook<BluesignFreeRoomsResponse>>('Bluesign', `/api/bluesign?free=${site ? site.join(',') : 'any'}`,
        (type, data, _err, url) => {
            switch (type) {
                case ApiResponseType.ERROR:
                    return [null, url, false, true];
                case ApiResponseType.LOADING:
                    return [null, url, true, false];
                case ApiResponseType.SUCCESS:
                    return [data!, url, false, false];
            }
        }, pollTime);