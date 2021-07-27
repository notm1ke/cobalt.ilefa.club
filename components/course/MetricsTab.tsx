import React from 'react';
import styles from '../styling/inspection.module.css';

import { Badge } from 'reactstrap';
import { MetricsEvent } from '../../util';

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
    if (isNaN(time) || time < 0 || time > Infinity)
        return 'text-purple';
    if (time >= time && time <= 450)
        return 'text-success';
    if (time > 450 && time < 1000)
        return 'text-warning';
    return 'text-danger';
}

export const MetricsTab: React.FC<MetricsTabProps> = ({ metrics }) => {
    return (
        <div className={styles.tabBody}>
            <pre className={`${styles.sectionTitle} text-primary mt-3`}><i className="fa fa-flask fa-fw"></i> Metrics Log</pre>
            {
                metrics.map(event => (
                    <>
                        <span className={styles.metricsEntry}>
                            {generateBadge(event.success)} <span className="text-primary mr--1">GET</span> {event.request} {event.success
                                ? <span className={timeColor(event.time)}>({event.time}ms)</span>
                                : ''}
                        </span><br/>
                    </>
                ))
            }
        </div>
    )
}