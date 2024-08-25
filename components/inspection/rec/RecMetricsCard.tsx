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

import { DevElement } from '../../env';
import { mdiServerNetwork } from '@mdi/js';

export interface RecMetricsCardProps {
    data?: number;
    timings?: number;
}

const timeColor = (time: number) => {
    if (isNaN(time) || time <= 0 || time > Infinity)
        return 'text-purple';
    if (time > 0 && time <= 450)
        return 'text-success';
    if (time > 450 && time < 1000)
        return 'text-warning';
    return 'text-danger';
}

export const RecMetricsCard: React.FC<RecMetricsCardProps> = ({ data, timings }) => {
    return (
        <DevElement>
            <div className="card shadow shadow-lg--hover mt-3 mb-xl-0">
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <div className={`card-title text-lowercase font-weight-600 text-muted mb-1 ${styles.cardTitle}`}>metrics</div>
                            <span className={styles.sectionStatisticNumber}>
                                {timings && timings !== -1 && (
                                    <>
                                        Roundtrip link took <span className={timeColor(timings)}>{timings}ms</span>.
                                        Socket payload: <span className="text-primary">{data}</span>
                                    </>
                                )}

                                {!timings || timings === -1 && (
                                    <>
                                        <b>Pending socket capture..</b>
                                    </>
                                )}
                            </span>
                        </div>
                        <div className="col-auto col">
                            <div className={`icon icon-shape bg-primary text-white rounded-circle shadow`}>
                                <MdiIcon path={mdiServerNetwork} size={1.5} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DevElement>
    );
}