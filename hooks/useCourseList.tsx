import useSWR from 'swr';
import * as Logger from '../util/logger';

export type CourseListResponse = {
    data: {
        courses: CoursePayload[];
    } | null;
    isLoading: boolean;
    isError: boolean;
}

export type CoursePayload = {
    name: string;
    catalogName: string;
    attributes: {
        lab: boolean;
        writing: boolean;
        quantitative: boolean;
        environmental: boolean;
        contentAreas: string[];
    }
}

export const useCourseList = (): CourseListResponse => {

    const start = Date.now();
    const fetcher = (url: string) => fetch(url).then(r => r.json());
    const { data, error } = useSWR('/api/courses', fetcher);

    if (!data && !error) {
        return {
            data: null,
            isLoading: true,
            isError: false
        }
    }

    if (error) {
        Logger.timings('useCourseList', 'Fetch', start, Logger.LogLevelColor.ERROR, 'failed in');
        Logger.debug('useCourseList', `The server responded with an unknown error.`, Logger.LogLevelColor.ERROR);
        
        return {
            data: null,
            isLoading: false,
            isError: true
        }
    }

    if (data && data.message) {
        Logger.timings('useCourseList', 'Fetch', start, Logger.LogLevelColor.ERROR, 'failed in');
        Logger.debug('useCourseList', `The server responded with: ${data?.message}`, Logger.LogLevelColor.ERROR);
        return {
            data: null,
            isLoading: true,
            isError: true
        }
    }

    let res = [...new Set(data.courses)];
    Logger.timings('useCourseList', 'Fetch', start);
    Logger.debug('useCourseList', 'Server response:', undefined, undefined, res);

    return {
        // get distinct courses (for some reason it has duplicates dont ask)
        data: { courses: res as CoursePayload[] },
        isLoading: false,
        isError: false
    }

}