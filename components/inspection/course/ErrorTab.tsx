/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import React from 'react';
import styles from '../../styling/inspection.module.css';

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