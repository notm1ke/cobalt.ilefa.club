import useSWR from 'swr';

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

    const fetcher = (url: string) => fetch(url).then(r => r.json());
    const { data, error } = useSWR('/api/courses', fetcher);

    if (data) return {
        // get distinct courses (for some reason it has duplicates dont ask)
        data: { courses: [...new Set(data.courses)] as CoursePayload[] },
        isLoading: false,
        isError: false
    }

    return {
        data: null,
        isLoading: !data && !error,
        isError: error
    }

}