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
import styles from '../styling/ribbon.module.css';

import { Ribbon } from '.';
import { Color } from '../../util';

export interface PreviewRibbonProps {
    icon: string | JSX.Element;
    mdiIcon: boolean;
    content: JSX.Element;
    color?: Color;
}

export const PreviewRibbon = ({ icon, mdiIcon, content, color }: PreviewRibbonProps) => {
    let props = {
        color: color ?? 'primary' as Color,
        className: 'mt-5 mb--4 ml-md-5 mr-md-5',
        icon: mdiIcon ? <MdiIcon path={icon as string} size="25px" className={styles.mdiIcon} /> : icon,
        dismissible: true
    }

    return (
        <Ribbon {...props}>
            {content}
        </Ribbon>
    )
}