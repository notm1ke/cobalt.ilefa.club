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
import styles from '../../styling/inspection.module.css';

import { DevElement } from '../..';
import { decode as decodeEntities } from 'html-entities';
import { CompleteCoursePayload, ContentAreaNames, joinWithAnd, SessionNames } from '../../../util';

export interface OverviewTabProps {
    data: CompleteCoursePayload;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ data }) => (
    <div className={styles.tabBody}>
        {
            data.sections.length === 0 && (
                <>
                    <pre className={`${styles.sectionTitle} text-danger mt-3`}><i className="fa fa-times fa-fw"></i> Not Offered</pre>
                    <p className={styles.description}><b>{data.name}</b> is not being offered right now.</p>
                </>
            )
        }
        
        {
            data.grading === 'Honors Credit' && (
                <>
                    <pre className={`${styles.sectionTitle} text-danger mt-3`}><i className="fa fa-medal fa-fw"></i> Honors Enrollment</pre>
                    <p className={styles.description}>This course can only be enrolled in for Honors Credit - please keep this in mind while enrolling.</p>
                </>
            )
        }

        {
            data.sections.some(section => section.session !== 'Reg') && (
                <>
                    <pre className={`${styles.sectionTitle} text-warning mt-3`}><i className="fa fa-sun fa-fw"></i> Summer Sections</pre>
                    <p className={styles.description}><b>{data.name}</b> is being offered during <b>{joinWithAnd([...new Set(data.sections.filter(section => section.session !== 'Reg').map(section => SessionNames[section.session]))])}</b>.</p>
                </>
            )
        }

        <pre className={`${styles.sectionTitle} text-primary mt-3`}><i className="fa fa-file-alt fa-fw"></i> Course Description</pre>
        <p className={styles.description}>{decodeEntities(data.description)}</p>
        <pre className={`${styles.sectionTitle} text-primary`}><i className="fa fa-flag fa-fw"></i> Content Areas</pre>
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