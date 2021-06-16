import React from 'react';
import styles from '../styling/course.module.css';

export const LoaderTab = () => (
    <div className={`${styles.sectionDataExpanded} ${styles.loader}`}>
        <span className="text-gray">
            <i className="fa fa-spinner fa-spin fa-fw"></i> Loading..
        </span>
    </div>
)