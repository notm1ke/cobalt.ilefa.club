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

import MdiIcon from '@mdi/react';
import styles from '../../styling/section.module.css';

import { RecStatusCollapsible } from '.';
import { mdiListStatus } from '@mdi/js';
import { useEffect, useState } from 'react';
import { getAllStatuses } from '../../../util';

export const RecStatusCard: React.FC = () => {
    const [reload, setReload] = useState(false);
    const [status, setStatus] = useState(getAllStatuses());

    setInterval(() => setReload(!reload), 25000);
    useEffect(() => {
        if (reload) {
            setReload(false);
            setStatus(getAllStatuses());
        }
    }, [reload]);

    return (
        <div className="card shadow shadow-lg--hover mt-3 mb-4 mb-xl-0">
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <div className={`card-title text-lowercase font-weight-600 text-muted mb-1 ${styles.cardTitle}`}>facility status</div>
                        <div className="mt--2 mb-2">
                            <small>hover for hours</small>
                        </div>
                        {
                            Object.keys(status).map(key => (
                                <RecStatusCollapsible key={key} facility={key as any} status={status[key]} />
                            ))
                        }
                    </div>
                    <div className="col-auto col">
                        <div className={`icon icon-shape bg-primary text-white rounded-circle shadow`}>
                            <MdiIcon path={mdiListStatus} size={1.5} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}