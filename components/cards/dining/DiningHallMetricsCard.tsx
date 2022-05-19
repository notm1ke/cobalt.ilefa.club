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
import cardStyles from '../../styling/card.module.css';

import { getColorForTiming } from '../../../util';
import { mdiAccessPointNetwork } from '@mdi/js';

export interface DiningHallMetricsCardProps {
    timings?: number;
    loading: boolean;
    error: boolean;
}

export const DiningHallMetricsCard: React.FC<DiningHallMetricsCardProps> = ({ timings, loading, error }) => {
    let load = loading && !error && !timings;
    let err = error && !loading && !timings;

    return (
        <div className={`card shadow shadow-lg--hover mt-5 ${cardStyles.rgCardSm}`}>
            <div className="card-body">
                <div className="d-flex">
                    <div>
                        <h5>
                            <a className={`${cardStyles.cardSectionTitle} text-primary-light`}>
                                <MdiIcon path={mdiAccessPointNetwork} size="24px" className={`fa-fw ${cardStyles.cardTitleIcon}`} /> Metrics
                            </a>
                        </h5>

                        <p className={`text-dark ${cardStyles.cardSectionText}`}>
                            {timings && <>All systems operational.</>}
                            {load && <>Awaiting server response..</>}
                            {err && <>Outage</>}
                            <br />
                            {timings && <>RT Link: <b className={getColorForTiming(timings, [0, 600], [600, 1250])}>{timings.toFixed(2)}ms</b></>}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}