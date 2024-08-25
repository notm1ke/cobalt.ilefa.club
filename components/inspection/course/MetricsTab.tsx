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

import { MetricsEvent } from '../../../util';
import { Badge, UncontrolledCollapse } from 'reactstrap';

export interface MetricsTabProps {
    metrics: MetricsEvent[];
}

const generateBadge = (bool: boolean) => (
    <Badge color={bool ? 'success' : 'danger'} pill className="mr-1">
        {
            bool
                ? <i className="fa fa-check fa-fw"></i>
                : <i className="fa fa-times fa-fw"></i>
        }
    </Badge>
);

const timeColor = (time: number) => {
    if (isNaN(time) || time <= 0 || time > Infinity)
        return 'text-purple';
    if (time > 0 && time <= 450)
        return 'text-success';
    if (time > 450 && time < 1000)
        return 'text-warning';
    return 'text-danger';
}

export const MetricsTab: React.FC<MetricsTabProps> = ({ metrics }) => (
    <div className={styles.tabBody}>
        <pre className={`${styles.sectionTitle} text-primary mt-3`}><i className="fa fa-flask fa-fw"></i> Metrics Log</pre>
        {
            metrics.map(event => (
                <>
                    <span className={`${styles.metricsEntry} ${event.data ? 'cursor-pointer' : ''}`} id={`toggle-${event.time}`}>
                        {generateBadge(event.success)} <span className="text-primary mr--1">GET</span> {event.request} {event.success
                            ? <span className={timeColor(event.time)}>({event.time}ms)</span>
                            : ''}
                    </span><br/>

                    {
                        event.data && (
                            <UncontrolledCollapse toggler={`toggle-${event.time}`}>
                                <div className="card shadow mt-3 mb-5">
                                    <div className="card-body">
                                        <pre className="text-dark mb--1">HTTP 2.0 | <span className={event.success ? 'text-success' : 'text-danger'}>{event.success ? '200 OK' : 'XXX Error'}</span></pre>
                                        <pre className="text-dark mb--1">Roundtrip Time: <span className={timeColor(event.time)}>{event.time}ms</span></pre>
                                        <pre className="text-dark mb-2">Response Body:</pre>
                                        <pre className="text-primary mt-2">
                                            {JSON.stringify(event.data, null, 3)}
                                        </pre>
                                    </div>
                                </div>
                            </UncontrolledCollapse>
                        )
                    }
                </>
            ))
        }
    </div>
);