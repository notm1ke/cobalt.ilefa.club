/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
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
    credits: number;
    grading: string;
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