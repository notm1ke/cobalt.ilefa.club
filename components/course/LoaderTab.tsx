import React from 'react';
import styles from '../styling/course.module.css';

export interface LoaderTabProps {
    color?: string;
}

export const LoaderTab: React.FC<LoaderTabProps> = (props) => (
    <div className={`${styles.sectionDataExpanded} ${styles.loader}`}>
        <span className={props.color || 'text-gray'}>
            <i className="fa fa-spinner fa-spin fa-fw"></i> Loading..
        </span>
    </div>
)