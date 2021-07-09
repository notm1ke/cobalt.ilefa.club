import React from 'react';
import styles from '../styling/inspection.module.css';

export interface ErrorTabProps {
    message?: string;
    color?: string;
    icon?: string;
}

export const ErrorTab: React.FC<ErrorTabProps> = ({ message, color, icon }) => (
    <div className={`${styles.sectionDataExpanded} ${styles.loader} ${color || 'text-danger'}`}>
        <i className={`${icon || 'fa fa-times-circle'} fa-fw mr-2`}></i>{message || 'Something went wrong while processing your request.'}
    </div>
)