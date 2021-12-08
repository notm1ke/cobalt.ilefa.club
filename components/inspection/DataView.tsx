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