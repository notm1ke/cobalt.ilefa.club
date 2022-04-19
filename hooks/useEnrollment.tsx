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