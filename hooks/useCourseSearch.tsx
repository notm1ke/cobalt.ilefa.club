/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
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