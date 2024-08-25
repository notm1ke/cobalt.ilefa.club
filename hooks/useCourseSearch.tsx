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

import { MutatorCallback } from 'swr/dist/types';

import {
    ApiResponseType,
    createRemoteHook,
    UnshapedApiResponse
} from '../util';

export type CourseSearchShapedResponse = [
    CoursePayload[] | null,
    boolean,
    boolean,
    () => void,
    (data?: CourseSearchPayloadResponse | Promise<CourseSearchPayloadResponse> | MutatorCallback<CourseSearchPayloadResponse>, shouldRevalidate?: boolean) => Promise<CourseSearchPayloadResponse | undefined>
]

export type CourseSearchPayloadResponse = UnshapedApiResponse & {
    courses: CoursePayload[];
}

type CoursePayload = {
    name: string;
    gradingType: string;
    catalogName: string;
    catalogNumber: string;
    attributes: {
        lab: boolean;
        writing: boolean;
        quantitative: boolean;
        environmental: boolean;
        contentAreas: string[];
    }
}

export interface CourseSearchProps {
    input: string;
    limit?: number;
    advancedOpts: any;
}

export const useCourseSearch = ({ input, limit, advancedOpts }: CourseSearchProps): CourseSearchShapedResponse => 
    createRemoteHook<CourseSearchPayloadResponse, CourseSearchShapedResponse>('CourseSearch', '/api/search',
        (type, data, _err, _url, revalidate, mutate) => {
            switch (type) {
                case ApiResponseType.ERROR:
                    return [null, false, true, revalidate!, mutate!];
                case ApiResponseType.LOADING:
                    return [null, true, false, revalidate!, mutate!];
                case ApiResponseType.SUCCESS: {
                    return [data!.courses, false, false, revalidate!, mutate!];
                }
            }
        }, undefined, 'POST', { input, limit: limit ?? -1, advancedOpts });