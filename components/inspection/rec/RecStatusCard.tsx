/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import MdiIcon from '@mdi/react';
import styles from '../../styling/section.module.css';

import { Badge } from 'reactstrap';
import { mdiListStatus } from '@mdi/js';
import { Fragment, useEffect, useState } from 'react';
import { getAllStatuses, RecFacility } from '../../../util';

export const RecStatusCard: React.FC = () => {
    const [reload, setReload] = useState(false);
    const [status, setStatus] = useState(getAllStatuses());

    setInterval(() => setReload(!reload), 25000);
    useEffect(() => {
        if (reload) {
            setReload(false);
            setStatus(getAllStatuses());
        }
    }, [reload]);

    return (
        <div className="card shadow shadow-lg--hover mt-3 mb-4 mb-xl-0">
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <div className={`card-title text-lowercase font-weight-600 text-muted mb-1 ${styles.cardTitle}`}>facility status</div>
                        {
                            Object.keys(status).map(key => (
                                <Fragment key={key}>
                                    <span className={styles.facility}>
                                        <Badge color={status[key] ? 'success' : 'danger'}>{status[key] ? <i className="fa fa-check fa-fw"></i> : <i className="fa fa-times fa-fw"></i>}</Badge> {RecFacility[key]}
                                    </span>
                                    <br />
                                </Fragment>
                            ))
                        }
                    </div>
                    <div className="col-auto col">
                        <div className={`icon icon-shape bg-primary text-white rounded-circle shadow`}>
                            <MdiIcon path={mdiListStatus} size={1.5} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}