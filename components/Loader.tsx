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
import PageLoader from 'react-loader-spinner';
import styles from './styling/loader.module.css';

export const Loader = () => {
    return (
        <body className="bg-ilefa-dark">
            <div className={`loader-bg ${styles.loader}`}>
                <PageLoader type="TailSpin" color="#ffffff" height={60} width={60} />
            </div>
        </body>
    );
}