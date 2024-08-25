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

import { ApiResponseType, createRemoteHook, UnshapedApiResponse } from '../util';

type BuildingType = 'academic' | 'residential' | 'dining' | 'athletics' | 'poi' | 'other';

export enum DayType {
    MONDAY = 'Monday',
    TUESDAY = 'Tuesday',
    WEDNESDAY = 'Wednesday',
    THURSDAY = 'Thursday',
    FRIDAY = 'Friday',
    SATURDAY = 'Saturday',
    SUNDAY = 'Sunday'
}

export type MarkerHours = {
    day: string;
    open: string;
    close: string;
}

export type LatLng = {
    lat: number;
    lng: number;
}

export type MarkerPayload = {
    name: string;
    position: LatLng;
    type: BuildingType;
    description: string;
    address: string;
    classroomPrefixes?: string[];
    diningHallType?: string;
    residenceHallType?: string;
    hours?: MarkerHours[];
}

export type CartographerResponse = UnshapedApiResponse & {
    markers: MarkerPayload[];
}

export type CartographerResponsePayload = [
    MarkerPayload[] | null,
    boolean,
    boolean
]

export const useCartographer = (): CartographerResponsePayload =>
    createRemoteHook<CartographerResponse, CartographerResponsePayload>('Cartographer', '/api/maps',
        (type, data, _err, _url) => {
            switch (type) {
                case ApiResponseType.ERROR:
                    return [null, false, true];
                case ApiResponseType.LOADING:
                    return [null, true, false];
                case ApiResponseType.SUCCESS: {
                    return [data!.markers, false, false];
                }
            }
        });