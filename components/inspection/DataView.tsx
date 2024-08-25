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

import React from 'react';
import styles from '../styling/inspection.module.css';

export interface DataViewProps {
    name: string | JSX.Element;
    value: string | number | JSX.Element;
    divider?: boolean;
}

export const DataView: React.FC<DataViewProps> = ({ name, value, divider = true }) => (
    <div>
        <div className={styles.statistic}>
            <div className={styles.head}>
                <h6 className={`text-dark ${styles.statisticField}`}>{name}</h6>
            </div>
            { divider && <div className={styles.divider}></div> }
            <div className={styles.value}>
                <h6 className={`text-dark ${styles.statisticField}`}>{value}</h6>
            </div>
        </div>
    </div>
)