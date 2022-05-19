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