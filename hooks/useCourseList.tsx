import useSWR from 'swr';

export type CourseListResponse = {
    data: {
        courses: string[];
    } | null;
    isLoading: boolean;
    isError: boolean;
}

export const useCourseList = (): CourseListResponse => {

    const fetcher = (url: string) => fetch(url).then(r => r.json());
    const { data, error } = useSWR('/api/courses', fetcher);

    if (data) return {
        // get distinct courses (for some reason it has duplicates dont ask)
        data: { courses: [...new Set(data.courses)] as string[] },
        isLoading: false,
        isError: false
    }

    return {
        data: null,
        isLoading: !data && !error,
        isError: error
    }

}