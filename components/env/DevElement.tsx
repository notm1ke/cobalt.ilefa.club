/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import { isDevelopment, isPreview } from '../../util'

export interface DevElementProps {
    allowStaging?: boolean;
}

export const DevElement: React.FC<DevElementProps> = ({ allowStaging, children }) => {
    if (isDevelopment() || allowStaging && isPreview())
        return <>{children}</>;

    return <></>;
}