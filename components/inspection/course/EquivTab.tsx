import React from 'react';
import styles from '../../styling/inspection.module.css';

import { ErrorTab } from './ErrorTab';
import { LoaderTab } from './LoaderTab';
import { useBluetrade } from '../../../hooks';
import { SimpleExternalCourse } from '@ilefa/bluetrade';
import { CompleteCoursePayload, IMetricsComponent } from '../../../util';

type NestedCourseDefinition = {
    [school: string]: SimpleExternalCourse[];
}

export interface EquivTabProps extends IMetricsComponent {
    data: CompleteCoursePayload;
}

export const EquivTab: React.FC<EquivTabProps> = ({ data, recordMetric }) => {
    const [equiv, request, loading, error] = useBluetrade({ course: data.name });
    
    if (loading) return <LoaderTab />;
    if (error) {
        recordMetric({ request, success: true, data: equiv, time: -1 });
        return <ErrorTab />;
    }

    recordMetric({ request, success: true, data: equiv, time: equiv!.timings });

    const nested = equiv!.transferable.reduce((acc, cur) => {
        const school = cur.school.toLowerCase();
        if (!acc[school]) acc[school] = [];
        acc[school].push(cur);
        return acc;
    }, {} as NestedCourseDefinition);

    if (!equiv!.transferable.length) return (
        <div className="mt-4">
            <pre className={`${styles.sectionTitle} text-danger mt-3`}><i className="fa fa-times fa-fw"></i> Not Transferrable</pre>
            <p className={styles.description}>This course has no transferrable equivalents from other institutions.</p>
        </div>
    )

    return (
        <div className={`${styles.tabBody} mt-2`}>
            {Object.values(nested).map(ent => {
                let schoolName = ent[0].school;
                return (
                    <>
                        <pre className="text-primary-light font-weight-bold" key={schoolName}>{schoolName}</pre>
                        {ent.map(course => (
                            <li className={`${styles.description} ${styles.caList} ${styles.transferListItem}`}>
                                {course.name}
                            </li>
                        ))}
                    </>
                )
            })}
        </div>
    )
}