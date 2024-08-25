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
        case UConnServiceStatus.OPERATIONAL: return { color: 'success', icon: mdiCheck };
        case UConnServiceStatus.DEGRADED:    return { color: 'warning', icon: mdiReloadAlert };
        case UConnServiceStatus.REPORTING:   return { color: 'primary-light', icon: mdiEyeCheck };
        case UConnServiceStatus.OUTAGE:      return { color: 'danger', icon: mdiAlertCircle };
        default:                             return { color: 'purple', icon: mdiHelpCircle };
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