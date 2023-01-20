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

import { useEffect } from 'react';
import { mdiAccountSupervisor } from '@mdi/js';
import { useLocalStorage, useOnPageLoaded } from '../../../hooks';

export interface RecOccupancyCardProps {
    data?: number;
}

export const RecOccupancyCard: React.FC<RecOccupancyCardProps> = ({ data }) => {
    const [value, setValue] = useLocalStorage('rec-occupancy', data ?? 0);
    const enabled = useOnPageLoaded();

    useEffect(() => () => {
        if (data) setValue(data);
    }, [data]);

    return (
        <div className="card shadow shadow-lg--hover mt-5 mb-4 mb-xl-0">
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <div className={`card-title text-lowercase font-weight-600 text-muted mb-0 ${styles.cardTitle}`}>occupants <small className="vaRevert">(1m)</small></div>
                        <span className={`h2 font-weight-bold mb-0 ${styles.cardText}`}>
                            {!enabled && <i className="fa fa-loader fa-spin"></i>}
                            {enabled && (!data || data === -1) ? value : data!.toLocaleString()}
                        </span>
                    </div>
                    <div className="col-auto col">
                        <div className={`icon icon-shape bg-primary text-white rounded-circle shadow`}>
                            <MdiIcon path={mdiAccountSupervisor} size={1.5} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}