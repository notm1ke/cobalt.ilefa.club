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
 
import {
    ApiResponseType,
    DefaultShapedHook,
    createRemoteHook,
    TimedRequest,
    UnshapedApiResponse,
    RecQueryMode
} from '../util';

export type BluefitResponseShape = TimedRequest & UnshapedApiResponse & {
    occupants?: number;
    daily?: BluefitDailyRecord[];
    weekly?: BluefitWeeklyRecord[];
}

export type BluefitDailyRecord = {
    time: string;
    values: number[];
    average: number;
}

export type BluefitWeeklyRecord = {
    day: string;
    values: TimeOccupancyKeyPair[];
    average: number;
}

type TimeOccupancyKeyPair = {
    time: string;
    occupants: number;
}

export const useBluefit = (pollTime: number | undefined, day: number, ...mode: RecQueryMode[]): DefaultShapedHook<BluefitResponseShape> =>
    createRemoteHook<BluefitResponseShape, DefaultShapedHook<BluefitResponseShape>>('Bluefit', `/api/bluefit?mode=${mode.join(',')}&day=${day}`,
        (type, data, _err, url) => {
            switch (type) {
                case ApiResponseType.ERROR:
                    return [null, url, false, true];
                case ApiResponseType.LOADING:
                    return [null, url, true, false];
                case ApiResponseType.SUCCESS:
                    return [data!, url, false, false];
            }
        }, pollTime, 'GET', null, 10, 1000);