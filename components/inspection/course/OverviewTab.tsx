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