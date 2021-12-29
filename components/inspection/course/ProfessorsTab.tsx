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
                            recordMetric={recordMetric}
                        />)
            }
        </>
    )
}