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
    UnshapedApiResponse
} from '../util';

export type CourseListShapedResponse = [
    CoursePayload[] | null,
    boolean,
    boolean
]

export type CoursePayloadResponse = UnshapedApiResponse & {
    courses: CoursePayload[];
}

export type CoursePayload = {
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

export const useCourseList = (): CourseListShapedResponse => 
    createRemoteHook<CoursePayloadResponse, CourseListShapedResponse>('CourseList', '/api/courses',
        (type, data, _err, _url) => {
            switch (type) {
                case ApiResponseType.ERROR:
                    return [null, false, true];
                case ApiResponseType.LOADING:
                    return [null, true, false];
                case ApiResponseType.SUCCESS: {
                    let distinct = Array
                        .from(new Set(data!
                            .courses
                            .map(course => course.name)))
                            .map(name => ({
                                ...data!
                                    .courses
                                    .find(course => course.name === name)
                            }))
                            .filter(course => course !== null)
                            .map(course => course as CoursePayload);

                    return [distinct, false, false];
                }
            }
        });