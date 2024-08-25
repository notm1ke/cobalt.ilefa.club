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
import { mdiAccountSupervisor } from '@mdi/js';
import { useLocalStorage } from '../../../hooks';

export interface RecOccupancyCardProps {
    data?: number;
}

export const RecOccupancyCard: React.FC<RecOccupancyCardProps> = ({ data }) => {
    const [value, setValue] = useLocalStorage('rec-occupancy', data);
    useEffect(() => () => {
        if (data !== -1)
            setValue(data);
    }, []);

    return (
        <div className="card shadow shadow-lg--hover mt-5 mb-4 mb-xl-0">
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <div className={`card-title text-lowercase font-weight-600 text-muted mb-0 ${styles.cardTitle}`}>occupants <small className="vaRevert">(1m)</small></div>
                        <span className={`h2 font-weight-bold mb-0 ${styles.cardText}`}>
                            {(data && data === -1) ? value : data!.toLocaleString()}
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