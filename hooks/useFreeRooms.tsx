/*
 * Copyright (c) 2024 ILEFA Labs
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
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