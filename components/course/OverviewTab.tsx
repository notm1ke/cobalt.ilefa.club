import React from 'react';
import styles from '../styling/course.module.css';

import { CompleteCoursePayload, ContentAreaNames } from '../../util';

export interface OverviewTabProps {
    data: CompleteCoursePayload;
}

export const OverviewTab = ({ data }: OverviewTabProps) => (
    <div className={styles.tabBody}>
        <pre className={`${styles.sectionTitle} text-primary`}><i className="fa fa-file-alt fa-fw"></i> Course Description</pre>
        <p className={styles.description}>{data.description}</p>
        <pre className={`${styles.sectionTitle} text-primary`}><i className="fa fa-file-alt fa-fw"></i> Content Areas</pre>
        {
            !!data.attributes.contentAreas.length && (
                <p className={styles.description}>
                    {data.attributes.contentAreas.map((area: string) => (
                        <li className={styles.caList} key={area}>
                            <b>{area}</b> - {ContentAreaNames[area]}
                        </li>
                    ))}
                </p>
            )
        }
        {
            !data.attributes.contentAreas.length && (
                <p className={styles.description}>
                    <b>{data.name}</b> does not cover any content areas.
                </p>
            )
        }
        <pre className={`${styles.sectionTitle} text-primary`}><i className="fa fa-tasks fa-fw"></i> Prerequisites</pre>
        <p className={styles.descriptionLast}>{data.prerequisites}</p>
    </div>
)