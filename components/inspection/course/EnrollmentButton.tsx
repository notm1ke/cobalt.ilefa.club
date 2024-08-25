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

import styles from '../../styling/inspection.module.css';

import { useState } from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { CompleteCoursePayload, EnrollmentPayload, SectionData } from '@ilefa/husky';

import {
    convertFromHuskyEnrollment,
    convertToHuskyEnrollment,
    getEnrollmentColor,
    getLatestTimeValue
} from '../../../util';

export interface EnrollmentButtonProps {
    course: CompleteCoursePayload;
    data: SectionData;
}

export const EnrollmentButton: React.FC<EnrollmentButtonProps> = ({ data }) => {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    const sixAmToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 6, 0, 0, 0);
    const sixAmTomorrow = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 6, 0, 0, 0);
    let sixAm = sixAmTomorrow.getTime() > today.getTime()
        ? sixAmToday
        : sixAmTomorrow;

    if (sixAm.getTime() > today.getTime())
        sixAm.setDate(sixAm.getDate() - 1);

    const [enrollment, _setEnrollment] = useState<EnrollmentPayload>(convertFromHuskyEnrollment(data));
    const [lastUpdated, _setLastUpdated] = useState(sixAm);
    const [loading, _setLoading] = useState(false);

    return (
        <span className={getEnrollmentColor(convertToHuskyEnrollment(enrollment, data))} id={`tooltip-waitlist-${data.section.replace(/[^\d\+]/g, '')}-${data.campus}-${data.term.substring(0, 1) + data.term.split(/(\d{2,4})/)[1].substring(2)}`}>
            {loading && <i className="fas fa-spinner fa-spin text-default" />}{" "}
            {!loading && ((enrollment.available ?? 0) + '/' + (enrollment.total ?? 0))}{" "}
            {data.enrollment.waitlist && <span className={`${styles.extraRoomsIndicator} text-primary`}>+{data.enrollment.waitlist}</span>}{" "}
            <UncontrolledTooltip delay={0} placement="top" target={`tooltip-waitlist-${data.section.replace(/[^\d\+]/g, '')}-${data.campus}-${data.term.substring(0, 1) + data.term.split(/(\d{2,4})/)[1].substring(2)}`}>
                <b>Enrollment Information</b>
                <br/>{enrollment.available}/{enrollment.total} ({Math.round(enrollment.percent * 100)}%)
                { data.enrollment.waitlist &&
                    (
                        <>
                            <br/><br />
                            <b>Waitlist Information</b>
                            <br/>{data.enrollment.waitlist} spaces left
                        </>
                    )
                }
                <br />
                <br />
                <b>Last Update</b>
                <br />{getLatestTimeValue(Date.now() - lastUpdated.getTime())} ago
            </UncontrolledTooltip>
        </span>
    )
}