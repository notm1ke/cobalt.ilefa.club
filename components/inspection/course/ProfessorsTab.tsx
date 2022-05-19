/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import React from 'react';

import { ErrorTab, LoaderTab } from '.';
import { useProfessors } from '../../../hooks';
import { ProfessorView } from './ProfessorView';
import { CompleteCoursePayload, IMetricsComponent } from '../../../util';

export interface ProfessorsTabProps extends IMetricsComponent {
    course: CompleteCoursePayload;
}

export const ProfessorsTab: React.FC<ProfessorsTabProps> = ({ course, recordMetric }) => {
    let [data, request, loading, error] = useProfessors({ course: course.name, recordMetric });
    if (loading) return <LoaderTab />;
    if (error || !data) {
        recordMetric({ request, success: false, time: -1 });
        return <ErrorTab />;
    }
    
    recordMetric({ request, success: true, time: data.timings });

    const distinct = data
        .professors!
        .map(ent => ({ ...ent, name: ent.name.trim() }))
        .filter(ent => !ent.name.includes(' & '))
        .filter(ent => !!ent.name);
    
    if (!data.professors!.length) return (
        <ErrorTab message="There aren't any professors teaching this course." color="text-gray" />
    )

    let showTerm = true; // data.professors!.some(prof => prof.sections.some(sec => sec.term !== prof.sections[0].term));

    return (
        <>
            {
                distinct
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .sort((a, b) => Number(b.rmpIds.length > 0) - Number(a.rmpIds.length > 0))
                    .map(professor =>
                        <ProfessorView
                            professor={professor}
                            key={professor.name}
                            rmp={professor.rmpIds.length > 0}
                            show={distinct.length === 1}
                            showTerm={showTerm}
                            recordMetric={recordMetric}
                        />)
            }
        </>
    )
}