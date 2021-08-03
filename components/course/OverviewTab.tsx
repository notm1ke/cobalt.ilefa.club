import React from 'react';
import styles from '../styling/inspection.module.css';

import { DevElement } from '../DevElement';
import { decode as decodeEntities } from 'html-entities';
import { CompleteCoursePayload, ContentAreaNames } from '../../util';

export interface OverviewTabProps {
    data: CompleteCoursePayload;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ data }) => (
    <div className={styles.tabBody}>
        <pre className={`${styles.sectionTitle} text-primary mt-3`}><i className="fa fa-file-alt fa-fw"></i> Course Description</pre>
        <p className={styles.description}>{decodeEntities(data.description)}</p>
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
        <p className={styles.description}>{decodeEntities(data.prerequisites)}</p>
        <DevElement>
            <pre className={`${styles.sectionTitle} text-primary`}><i className="fa fa-history fa-fw"></i> Snapshots</pre>
            <p className={styles.descriptionLast}>There are no snapshots available for <b>{data.name}</b>.</p>
        </DevElement>
    </div>
)