import React from 'react';
import styles from '../styling/course.module.css';

export interface DataViewProps {
    name: string;
    value: string;
}

export const DataView = ({ name, value }: DataViewProps) => (
    <div>
        <div className={styles.statistic}>
            <div className={styles.head}>
                <h6 className={`text-dark ${styles.statisticField}`}>{name}</h6>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.value}>
                <h6 className={`text-dark ${styles.statisticField}`}>{value}</h6>
            </div>
        </div>
        
    </div>
)