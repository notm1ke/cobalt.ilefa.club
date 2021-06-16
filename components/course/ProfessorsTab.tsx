import React from 'react';

import { CompleteCoursePayload } from '../../util';
import { ProfessorView } from './ProfessorView';
import { useProfessors } from '../../hooks';
import { ErrorTab, LoaderTab } from '.';

export interface ProfessorsTabProps {
    course: CompleteCoursePayload;
}

export const ProfessorsTab = ({ course }: ProfessorsTabProps) => {

    let { data, isLoading, isError } = useProfessors({ course: course.name });

    if (isLoading) return <LoaderTab />;
    if (isError || !data?.professors) return <ErrorTab />;
    
    const distinct = data
        .professors
        .map(ent => {
            return { ...ent, name: ent.name.trim() }
        })
        .filter(ent => !ent.name.includes(','))
        .filter(ent => !!ent.name);
    
    if (!data.professors.length) return (
        <ErrorTab message="There aren't any professors teaching this course." color="text-gray" />
    )

    return (
        <>
            { distinct
                .sort((a, b) => a.name.localeCompare(b.name))
                .sort((a, b) => Number(b.rmpIds.length > 0) - Number(a.rmpIds.length > 0))
                .map(professor => <ProfessorView professor={professor} rmp={professor.rmpIds.length > 0} show={distinct.length === 1} />) }
        </>
    )
}