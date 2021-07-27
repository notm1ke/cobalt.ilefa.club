import useSWR from 'swr';
import * as Logger from '../util/logger';

import { CampusType } from '@ilefa/husky';
import { CompleteCoursePayload, TimedRequest } from '../util';

export interface CourseLookupProps {
    name: string;
    campus?: CampusType;
    bare?: boolean;
    initial?: boolean;
}

export type CourseInspectionPayload = CompleteCoursePayload & TimedRequest;

export type CourseInspectionResult = {
    data: CourseInspectionPayload | null;
    request: string;
    isLoading: boolean;
    isError: boolean;
}

export const useCourse = (props: CourseLookupProps): CourseInspectionResult => {
    let queryString = `${props.campus
        ? `?campus=${props.campus}`
        : '' + (props.bare
            ? (props.campus
                ? '&'
                : '?')
            + `bare=${props.bare}` : '')
            + (props.initial
                ? (props.campus || props.bare
                    ? '&'
                    : '?') 
                    + `initial=${props.initial}` : '')}`

    let noop = false;
    let req = `/api/course/${props.name + queryString}`;
    if (!props.name) {
        noop = true;
        req = '/api/noop';
    }

    Logger.debug('useCourse', 'Initiating request for ' + props.name + '..', undefined, !noop);
    Logger.debug('useCourse', 'Query string:', undefined, !noop, req);

    const start = Date.now();
    const fetcher = (url: string) => fetch(url).then(r => r.json());
    const { data, error } = useSWR(req, fetcher);

    if (!data && !error) {
        return {
            data: null,
            request: req,
            isLoading: true,
            isError: false
        }
    }

    if (error) {
        Logger.timings('useCourse', 'Fetch', start, Logger.LogLevelColor.ERROR, 'failed in');
        Logger.debug('useCourse', `The server responded with an unknown error.`, Logger.LogLevelColor.ERROR);
        
        return {
            data: null,
            request: req,
            isLoading: false,
            isError: true
        }
    }

    if (data && data.message) {
        Logger.timings('useCourse', `Fetch ${props.name}`, start, Logger.LogLevelColor.ERROR, 'failed in', !noop);
        Logger.debug('useCourse', `The server responded with: ${data?.message}`, Logger.LogLevelColor.ERROR, !noop);        
        return {
            data: null,
            request: req,
            isLoading: false,
            isError: true
        }
    }

    Logger.timings('uesCourse', 'Fetch', start, undefined, 'took', !noop);
    Logger.debug('useCourse', `Server response:`, undefined, !noop, data);
    return {
        data,
        request: req,
        isLoading: false,
        isError: false
    }

}