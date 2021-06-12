import useSWR from 'swr';

export type Course = {
    name: string;
    catalogName: string;
    catalogNumber: string;
    prerequisites: string;
    attributes: CourseAttributes; 
    credits: number;
    grading: string;
    description: string;
}

export type CoursePayload = {
    href: string;
    subject: string;
    number: string;
    name: string;
    attrib: string[];
}

export type CourseAttributes = {
    lab: boolean;
    writing: boolean;
    quantitative: boolean;
    environmental: boolean;
    contentAreas: ContentArea[];
}

export enum ContentArea {
    CA1 = 'CA1',
    CA2 = 'CA2',
    CA3 = 'CA3',
    CA4 = 'CA4',
    CA4INT = 'CA4INT'
}

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