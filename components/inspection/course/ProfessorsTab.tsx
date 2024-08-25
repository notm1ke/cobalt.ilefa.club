/*
 * Copyright (c) 2024 ILEFA Labs
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
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