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

import moment from 'moment';

import {
    DiningHallResponse,
    DiningHallType
} from '@ilefa/blueplate';

import {
    ApiResponseType,
    createRemoteHook,
    TimedRequest,
    UnshapedApiResponse
} from '../util';

export interface DiningHallLookupProps {
    hall: keyof typeof DiningHallType | null;
    date?: Date;
    now?: boolean;
    pollTime?: number;
}

export type DiningHallPayload = DiningHallResponse & TimedRequest & UnshapedApiResponse & {
    hasMeals: boolean;
}

type DiningHallShapedResponse = [
    DiningHallPayload | null,
    boolean,
    boolean
];

export const useDiningHall = ({ hall, date, now, pollTime }: DiningHallLookupProps): DiningHallShapedResponse => {
    let url = `/api/blueplate?hall=${hall}${!now && date ? `&date=${moment(date).format('MM-DD-YYYY')}` : ''}`;
    if (!hall) url = '/api/noop';

    return createRemoteHook<DiningHallPayload, DiningHallShapedResponse>('DiningHall', url,
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
        }, pollTime);
}