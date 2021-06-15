import useSWR from 'swr';

import { ProfessorData } from '@ilefa/husky';

export interface ProfessorsLookupProps {
    course: string;
    campus?: string;
}

export type ProfessorsResponse = {
    data: {
        professors: ProfessorData[];
    } | null;
    isLoading: boolean;
    isError: boolean;
}

export const useProfessors = ({ course, campus }: ProfessorsLookupProps): ProfessorsResponse => {

    const fetcher = (url: string) => fetch(url).then(r => r.json());
    const { data, error } = useSWR(`/api/professors/${course + (campus ? `?campus=${campus}` : '')}`, fetcher);

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