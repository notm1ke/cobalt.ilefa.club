/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import { EnrollmentPayload } from '@ilefa/husky';

import {
    ApiResponseType,
    CompleteCoursePayload,
    createRemoteHook,
    TimedRequest,
    UnshapedApiResponse
} from '../util';

export interface EnrollmentLookupProps {
    data: CompleteCoursePayload;
    section: string;
    term: string;
}

export type EnrollmentShapedPayload = EnrollmentPayload & TimedRequest & UnshapedApiResponse;

type EnrollmentShapedResponse = [
    EnrollmentShapedPayload | null,
    boolean,
    boolean
];

export const useEnrollment = ({ data, section, term }: EnrollmentLookupProps): EnrollmentShapedResponse => 
    createRemoteHook<EnrollmentShapedPayload, EnrollmentShapedResponse>('Enrollment', `/api/enrollment/${data.name}?section=${section}&term=${term}`,
        (type, data, _err, _url) => {
            switch (type) {
                case ApiResponseType.ERROR:
                    return [null, false, true];
                case ApiResponseType.LOADING:
                    return [null, true, false];
                case ApiResponseType.SUCCESS:
                    return [data!, false, false];
            }
        });