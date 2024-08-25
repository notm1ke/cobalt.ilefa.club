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

import { BluepagesRecord } from '@ilefa/bluepages';

import {
    ApiResponseType,
    DefaultShapedHook,
    createRemoteHook,
    IMetricsComponent,
    replaceAll,
    TimedRequest,
    UnshapedApiResponse
} from '../util';

export interface BluepagesQueryProps extends IMetricsComponent {
    name: string;
}

export type BluepagesResponsePayload = BluepagesRecord & TimedRequest & UnshapedApiResponse;

export const useBluepages = ({ name, recordMetric }: BluepagesQueryProps): DefaultShapedHook<BluepagesResponsePayload> =>
    createRemoteHook<BluepagesResponsePayload, DefaultShapedHook<BluepagesResponsePayload>>('Bluepages', `/api/bluepages/${replaceAll(name, /\s/, '_').toLowerCase()}`,
        (type, data, _err, url) => {
            switch (type) {
                case ApiResponseType.ERROR: {
                    recordMetric({ request: url, success: false, time: -1, data });
                    return [null, url, false, true];
                }
                case ApiResponseType.LOADING:
                    return [null, url, true, false];
                case ApiResponseType.SUCCESS: {
                    recordMetric({ request: url, success: true, time: data!.timings, data });
                    return [data!, url, false, false];
                }
            }
        });