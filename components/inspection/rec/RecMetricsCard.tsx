/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
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