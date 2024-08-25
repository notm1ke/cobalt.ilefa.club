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