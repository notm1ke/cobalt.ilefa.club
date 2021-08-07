import moment from 'moment';
import MdiIcon from '@mdi/react';
import styles from '../styling/card.module.css';

import { UConnServiceStatus } from '@ilefa/husky';
import { Color, CustomUConnServiceReport, ServiceUrls } from '../../util';

import {
    mdiAlertCircle,
    mdiCheck,
    mdiEyeCheck,
    mdiHelpCircle,
    mdiReloadAlert
} from '@mdi/js';

export interface StatusCardProps {
    report: CustomUConnServiceReport;
}

type StatusDisplayComponent = {
    color: Color;
    icon: string;
}

const getStatusDisplayComponent = ({ status }: CustomUConnServiceReport): StatusDisplayComponent => {
    switch (status) {
        case UConnServiceStatus.OPERATIONAL:
            return { color: 'success', icon: mdiCheck };
        case UConnServiceStatus.DEGRADED:
            return { color: 'warning', icon: mdiReloadAlert };
        case UConnServiceStatus.REPORTING:
            return { color: 'primary-light', icon: mdiEyeCheck };
        case UConnServiceStatus.OUTAGE:
            return { color: 'danger', icon: mdiAlertCircle };
        default:
            return { color: 'purple', icon: mdiHelpCircle }
    }
}

const serviceVerb = (level: UConnServiceStatus) => {
    if (level === UConnServiceStatus.OUTAGE)
        return 'has an';

    return 'is';
}

export const StatusCard: React.FC<StatusCardProps> = ({ report }) => {
    let { color, icon } = getStatusDisplayComponent(report);
    let href = ServiceUrls[report.service.toUpperCase().replace(/\s/, '_')];
    let newTab = !!href;

    return (
        <div className={`card shadow shadow-lg--hover mt-5 ${styles.rgCardSm}`}>
            <div className="card-body">
                <div className="d-flex">
                    <div>
                        <h5>
                            <a
                                href={href}
                                target={newTab ? '_blank' : undefined}
                                rel={newTab ? 'noopener noreferrer' : undefined}
                                className={`${styles.cardSectionTitle} text-primary-light`}>
                                    <MdiIcon path={icon} size={'24px'} className={'fa-fw vaSub'} /> {report.service}
                            </a>
                        </h5>

                        <p className="text-dark">
                            <b>{report.service}</b> {serviceVerb(report.status)} <span className={`text-${color} font-weight-bold`}>{report.status.toLowerCase()}</span><br/>
                            Last checked at <b>{moment(report.time).format('h:mm:ss a')}</b>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}