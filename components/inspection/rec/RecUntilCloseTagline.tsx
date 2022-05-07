/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import { useEffect, useState } from 'react';
import { getLatestTimeValue, getTimeUntilRecClose } from '../../../util';

export const RecUntilCloseTagline: React.FC = () => {
    const [untilClose, setUntilClose] = useState(getTimeUntilRecClose('SRC'));
    const [reload, setReload] = useState(false);

    setInterval(() => setReload(!reload), 1000);
    useEffect(() => {
        if (reload) {
            setReload(false);
            setUntilClose(getTimeUntilRecClose('SRC'));
        }
    }, [reload]);

    return (
        <span>
            { 
                untilClose <= 0
                    ? 'Currently closed'
                    : `Closing in ${getLatestTimeValue(untilClose)}`
            }
        </span>
    );
}