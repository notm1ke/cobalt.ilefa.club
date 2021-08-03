import { CampusType } from '@ilefa/husky';

import {
    ApiResponseType,
    CompleteCoursePayload,
    createRemoteHook,
    DefaultShapedHook,
    TimedRequest,
    UnshapedApiResponse
} from '../util';

export interface CourseLookupProps {
    name: string;
    campus?: CampusType;
    bare?: boolean;
    initial?: boolean;
}

export type CourseInspectionPayload = CompleteCoursePayload & TimedRequest & UnshapedApiResponse;

export const useCourse = ({ name, campus, bare, initial }: CourseLookupProps): DefaultShapedHook<CourseInspectionPayload> => {
    let queryString = `${campus
        ? `?campus=${campus}`
        : '' + (bare
            ? (campus
                ? '&'
                : '?')
            + `bare=${bare}` : '')
            + (initial
                ? (campus || bare
                    ? '&'
                    : '?') 
                    + `initial=${initial}` : '')}`

    let url = `/api/course/${name + queryString}`;
    if (!name) url = '/api/noop';

    return createRemoteHook<CourseInspectionPayload, DefaultShapedHook<CourseInspectionPayload>>('Course', url,
        (type, data, _err, url) => {
            switch (type) {
                case ApiResponseType.ERROR:
                    return [null, url, false, true];
                case ApiResponseType.LOADING:
                    return [null, url, true, false];
                case ApiResponseType.SUCCESS:
                    return [data!, url, false, false];
            }
        });
}