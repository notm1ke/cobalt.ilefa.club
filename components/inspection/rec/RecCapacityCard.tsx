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