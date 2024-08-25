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

import styles from '../../styling/section.module.css';
 
import { Fragment } from 'react';
import { Badge, UncontrolledTooltip } from 'reactstrap';

import {
    RecFacility,
    StandardRecHours,
    SummerRecHours,
    SUMMER_HOURS
} from '../../../util'

export interface RecStatusCollapsibleProps {
    facility: keyof typeof RecFacility;
    status: boolean;
}

export const RecStatusCollapsible: React.FC<RecStatusCollapsibleProps> = ({ facility, status }) => {
    let target = SUMMER_HOURS
        ? SummerRecHours
        : StandardRecHours;

    let hours = target[facility].filter(val => val.days.includes(new Date().getDay()));

    return (
        <>
            <span className={styles.facility} id={`facility-status-${facility}`}>
                <Badge color={status ? 'success' : 'danger'}>{status ? <i className="fa fa-check fa-fw"></i> : <i className="fa fa-times fa-fw"></i>}</Badge> {RecFacility[facility]}
            </span>
            <UncontrolledTooltip delay={0} placement="top" target={`facility-status-${facility}`}>
                {
                    hours.length === 0 && (
                        <span>
                            Closed for today
                        </span>
                    )
                }

                {
                    hours.length > 0 && hours.map((val: any, i: number, arr: any[]) => (
                        <Fragment key={`${val.start}-${val.end}-${i}`}>
                            {val.start} - {val.end}
                            {i !== arr.length - 1 && <br/>}
                        </Fragment>
                    ))
                }
            </UncontrolledTooltip>
            <br />
        </>
    )
}