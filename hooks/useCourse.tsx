import useSWR from 'swr';

import { CampusType } from '@ilefa/husky';
import { CompleteCoursePayload } from '../util';

export interface CourseLookupProps {
    name: string;
    campus?: CampusType;
    bare?: boolean;
    initial?: boolean;
}

export type CourseInspectionResult = {
    data: CompleteCoursePayload | null;
    isLoading: boolean;
    isError: boolean;
}

export const useCourse = (props: CourseLookupProps): CourseInspectionResult => {

    const fetcher = (url: string) => fetch(url).then(r => r.json());

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

    const { data, error } = useSWR(`/api/course/${props.name + queryString}`, fetcher);

    if (data && data.message) return {
        data: null,
        isLoading: false,
        isError: true
    }

    if (data) return {
        data,
        isLoading: false,
        isError: false
    }

    return {
        data: null,
        isLoading: !data && !error,
        isError: error
    }

}