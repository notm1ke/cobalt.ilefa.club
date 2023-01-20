/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import styles from '../../styling/section.module.css';
 
import { Fragment } from 'react';
import { Badge, UncontrolledTooltip } from 'reactstrap';

import {
    RecFacility,
    StandardRecHours,
    OffPeakRecHours,
    OFF_PEAK_HOURS
} from '../../../util'

export interface RecStatusCollapsibleProps {
    facility: keyof typeof RecFacility;
    status: boolean;
}

export const RecStatusCollapsible: React.FC<RecStatusCollapsibleProps> = ({ facility, status }) => {
    let target = OFF_PEAK_HOURS
        ? OffPeakRecHours
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