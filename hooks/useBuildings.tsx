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
