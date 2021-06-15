import useSWR from 'swr';

import { RateMyProfessorReport } from '@ilefa/husky';

export interface ProfessorLookupProps {
    rmpIds: string[];
}

export type ProfessorResponse = {
    data: {
        courses: RateMyProfessorReport[];
    } | null;
    isLoading: boolean;
    isError: boolean;
}

export const useProfessor = ({ rmpIds }: ProfessorLookupProps): ProfessorResponse => {

    const fetcher = (url: string) => fetch(url).then(r => r.json());
    const { data, error } = useSWR(`/api/professor/${rmpIds.join(',')}`, fetcher);

    if (data) return {
        // get distinct courses (for some reason it has duplicates dont ask)
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