import useSWR from 'swr';

import { CompleteCoursePayload } from '../util';

export interface CourseLookupProps {
    name: string;
    campus?: string;
}

export type CourseInspectionResult = {
    data: CompleteCoursePayload | null;
    isLoading: boolean;
    isError: boolean;
}

export const useCourse = (props: CourseLookupProps): CourseInspectionResult => {

    const fetcher = (url: string) => fetch(url).then(r => r.json());
    const { data, error } = useSWR(`/api/course/${props.name + (props.campus ? `?campus=${props.campus}` : '')}`, fetcher);

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