import React from 'react';
import styles from '../styling/course.module.css';

import { CompleteCoursePayload } from '../../util';
import { ProfessorData } from '@ilefa/husky';
import { ProfessorView } from './ProfessorView';
import { useProfessors } from '../../hooks';

export interface ProfessorsTabProps {
    course: CompleteCoursePayload;
}

export const ProfessorsTab = ({ course }: ProfessorsTabProps) => {

    let { data, isLoading, isError } = useProfessors({ course: course.name });

    if (isLoading) return <>pending</>;
    if (isError) return <>errored</>;
    if (!data) return <>no data</>;

    console.log('professors', data.professors)
    
    return (
        <>
            { data.professors.map(professor => <ProfessorView professor={professor} />) }
        </>
    )
}