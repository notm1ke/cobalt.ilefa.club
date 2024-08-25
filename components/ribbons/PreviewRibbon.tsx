/*
 * Copyright (c) 2024 ILEFA Labs
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
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