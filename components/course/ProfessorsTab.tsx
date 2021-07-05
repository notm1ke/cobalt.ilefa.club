import React from 'react';

import { ErrorTab, LoaderTab } from '.';
import { useProfessors } from '../../hooks';
import { ProfessorView } from './ProfessorView';
import { CompleteCoursePayload } from '../../util';

export interface ProfessorsTabProps {
    course: CompleteCoursePayload;
}

export const ProfessorsTab: React.FC<ProfessorsTabProps> = ({ course }) => {
    let { data, isLoading, isError } = useProfessors({ course: course.name });
    if (isLoading) return <LoaderTab />;
    if (isError || !data?.professors) return <ErrorTab />;
    
    const distinct = data
        .professors
        .map(ent => ({ ...ent, name: ent.name.trim() }))
        .filter(ent => !ent.name.includes(','))
        .filter(ent => !!ent.name);
    
    if (!data.professors.length) return (
        <ErrorTab message="There aren't any professors teaching this course." color="text-gray" />
    )

    return (
        <>
            {
                distinct
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .sort((a, b) => Number(b.rmpIds.length > 0) - Number(a.rmpIds.length > 0))
                    .map(professor => <ProfessorView professor={professor} rmp={professor.rmpIds.length > 0} show={distinct.length === 1} />)
            }
        </>
    )
}