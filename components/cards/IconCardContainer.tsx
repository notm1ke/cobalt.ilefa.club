/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import { ReactChild } from 'react';

export interface IconCardContainerProps {
    modifiers: string;
    children: ReactChild | ReactChild[];
}

export const IconCardContainer: React.FC<IconCardContainerProps> = props => {
    let modifiers = props.modifiers || "";
    let children = props.children || undefined;

    if (!children) {
        throw new Error('Icon Card Container cannot be initialized with no children.');
    }

    return (
        <div className={"container " + modifiers}>
            <div className="row d-flex">
                { children }
            </div>
        </div>
    )
}