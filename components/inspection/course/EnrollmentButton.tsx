import moment from 'moment';

import styles from '../../styling/inspection.module.css';

import { UncontrolledTooltip } from 'reactstrap';
import { useCallback, useEffect, useState } from 'react';
import { CompleteCoursePayload, EnrollmentPayload, SectionData } from '@ilefa/husky';
import { convertFromHuskyEnrollment, convertToHuskyEnrollment, getEnrollmentColor } from '../../../util';

export interface EnrollmentButtonProps {
    course: CompleteCoursePayload;
    data: SectionData;
}

export const EnrollmentButton: React.FC<EnrollmentButtonProps> = ({ course, data }) => {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    const sixAmToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 6, 0, 0, 0);
    const sixAmTomorrow = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 6, 0, 0, 0);
    const sixAm = sixAmTomorrow.getTime() > today.getTime()
        ? sixAmToday
        : sixAmTomorrow;

    const [enrollment, setEnrollment] = useState<EnrollmentPayload>(convertFromHuskyEnrollment(data));
    const [lastUpdated, setLastUpdated] = useState(sixAm);
    const [loading, setLoading] = useState(false);
    
    const runUpdate = () => {
        setLoading(true);
        updateEnrollment();
    }

    const updateEnrollment = useCallback(() =>
        fetch(`/api/enrollment/${course.name}?section=${data.section}&term=${data.term.replace(/\s/g, '')}`)
            .then(res => res.json())
            .then(res => {
                if (!res.available || !res.total)
                    throw new Error('Enrollment data unavailable');
                    
                setLastUpdated(new Date());
                setLoading(false);
                return setEnrollment(res);
            })
            .catch(_ => setEnrollment(convertFromHuskyEnrollment(data))), []);

    useEffect(() => {
        updateEnrollment();
    }, []);

    return (
        <span className={getEnrollmentColor(convertToHuskyEnrollment(enrollment, data))} onClick={runUpdate} id={`tooltip-waitlist-${data.section}-${data.campus}-${data.term.substring(0, 1) + data.term.split(/(\d{2,4})/)[1].substring(2)}`}>
            {loading && <i className="fas fa-spinner fa-spin text-default" />}{" "}
            {!loading && ((enrollment.available ?? 0) + '/' + (enrollment.total ?? 0))}{" "}
            {data.enrollment.waitlist && <span className={`${styles.extraRoomsIndicator} text-primary`}>+{data.enrollment.waitlist}</span>}{" "}
            <UncontrolledTooltip delay={0} placement="top" target={`tooltip-waitlist-${data.section}-${data.campus}-${data.term.substring(0, 1) + data.term.split(/(\d{2,4})/)[1].substring(2)}`}>
                <b>Enrollment Information</b>
                <br/>{enrollment.available}/{enrollment.total} ({Math.round(enrollment.percent * 100)}%)
                <br />{moment(lastUpdated).fromNow()}
                { data.enrollment.waitlist &&
                    (
                        <>
                            <br/><br />
                            <b>Waitlist Information</b>
                            <br/>{data.enrollment.waitlist} spaces left
                        </>
                    )
                }
                <br /><br />
                <pre className="text-primary mt--2 font-weight-bold">Click to refresh</pre>
            </UncontrolledTooltip>
        </span>
    )
}