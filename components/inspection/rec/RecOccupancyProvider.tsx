/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import { useBluefit } from '../../../hooks'
import { cloneElement, ReactElement } from 'react';

export interface RecOccupancyProviderProps {
    pollTime: number;
    children: ReactElement[];
}

export const RecOccupancyProvider: React.FC<RecOccupancyProviderProps> = ({ pollTime, children }) => {
    const [occupancy, _req, loading, error] = useBluefit(pollTime, 'occupants');
    return <>{children.map(child => cloneElement(child, { ...child.props, data: loading || error ? -1 : occupancy!.occupants }))}</>;
}