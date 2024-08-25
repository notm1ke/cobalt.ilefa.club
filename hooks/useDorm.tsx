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
    createRemoteHook,
    Dorm,
    DormHallType,
    DormRatings,
    TimedRequest,
    UnshapedApiResponse
} from '../util';

export interface DormLookupProps {
    hall: keyof typeof DormHallType | null;
}

export type DormInspectionPayload = Dorm & TimedRequest & UnshapedApiResponse & {
    ratings: DormRatings;
}

type DormShapedResponse = [
    DormInspectionPayload | null,
    boolean,
    boolean
];

export const useDorm = ({ hall }: DormLookupProps): DormShapedResponse => { 
    let url = `/api/dorms?type=${hall}`;
    if (!hall) url = '/api/noop';

    return createRemoteHook<DormInspectionPayload, DormShapedResponse>('Dorm', url,
        (type, data, _err, _url) => {
            // noop response - component not hydrated yet
            if (data && (data as any).ping)
                return [null, true, false];

            switch (type) {
                case ApiResponseType.ERROR:
                    return [null, false, true];
                case ApiResponseType.LOADING:
                    return [null, true, false];
                case ApiResponseType.SUCCESS:
                    return [data!, false, false];
            }
        });
}