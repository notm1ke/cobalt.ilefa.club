/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import { useLocalStorage } from '../../hooks';
import { useEffect, useState } from 'react';

export interface OneTimeViewProps {
    /**
     * The target ``localStorage`` key to check if the component
     * has been rendered before this instance.
     */
    target: string;
}

export const OneTimeView: React.FC<OneTimeViewProps> = ({ target, children }) => {
    const [rendered, setRendered] = useState(false);
    const [value, setValue] = useLocalStorage(target, true);

    useEffect(() => {
        setRendered(value);
        setValue(false);
    }, []);

    if (!rendered)
        return <></>;

    if (!value && !rendered)
        return <></>;

    return <>{children}</>;
}