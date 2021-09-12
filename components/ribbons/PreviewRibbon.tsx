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