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
import { useLocalStorage } from '../../../hooks';
import { MAXIMUM_CAPACITY } from '@ilefa/bluefit';
import { mdiHumanCapacityIncrease } from '@mdi/js';

export interface RecCapacityCardProps {
    data?: number;
}

export const RecCapacityCard: React.FC<RecCapacityCardProps> = ({ data }) => {
    const [value, setValue] = useLocalStorage('rec-capacity', data ? (data / MAXIMUM_CAPACITY) : 0);
    
    useEffect(() => {
        if (data)
            setValue(data);
    }, [data]);

    return (
        <div className="card shadow shadow-lg--hover mt-3 mb-4 mb-xl-0">
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <div className={`card-title text-lowercase font-weight-600 text-muted mb-0 ${styles.cardTitle}`}>capacity percent</div>
                        <span className={`h2 font-weight-bold mb-0 ${styles.cardText}`}>
                            {(((!value || (value && value < 0) ? 0 : value) / MAXIMUM_CAPACITY) * 100).toFixed(2)}%
                        </span>
                    </div>
                    <div className="col-auto col">
                        <div className={`icon icon-shape bg-primary text-white rounded-circle shadow`}>
                            <MdiIcon path={mdiHumanCapacityIncrease} size={1.5} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}