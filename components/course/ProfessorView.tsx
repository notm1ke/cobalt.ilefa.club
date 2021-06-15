import React from 'react';

import { useProfessor } from '../../hooks';
import { ProfessorData } from '@ilefa/husky';

export interface ProfessorViewProps {
    professor: ProfessorData;
}

export const ProfessorView = ({ professor }: ProfessorViewProps) => {
    if (!professor.rmpIds) {
        return <pre>no rmp ids!</pre>
    }

    const { data, isLoading, isError } = useProfessor({ rmpIds: professor.rmpIds });
    if (isLoading || isError) return <>pending</>
    return <pre>{JSON.stringify(data, null, 3)}</pre>
}