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

import styles from '../styling/card.module.css';

import { ReactElement } from 'react';

export interface IconCardProps {
    icon: string;
    iconColor?: string;
    headerText: string;
    headerHref?: string;
    headerColor?: string;
    headerShine?: boolean;
    content: ReactElement | string;
}

export const IconCard: React.FC<IconCardProps> = props => {
    let icon = props.icon || 'fa fa-exclamation-triangle';
    let iconColor = props.iconColor || 'bg-primary';
    let headerText = props.headerText || 'Icon Card';
    let headerHref = props.headerHref || undefined;
    let headerColor = props.headerColor || 'text-primary';
    let headerShine = props.headerShine || false;
    let content = props.content || <></>;

    return (
        <div className="col-lg-6 order-lg-1 d-flex align-items-stretch">
            <div className="card shadow shadow-lg--hover mt-5 rg-card-sm">
                <div className="card-body">
                    <div className="d-flex px-3">
                        <div>
                            <div className={`icon icon-shape ${iconColor} rounded-circle text-white`}>
                                <i className={icon}></i>
                            </div>
                        </div>
                        <div className={`pl-4 ${styles.sectionIconPosition}`}>
                            <h5 className={`${styles.cardSectionTitle} ${headerColor}`}>
                                { headerHref 
                                    ? <a className={headerColor + (headerShine ? ' shine' : '')} href={headerHref}>
                                        {headerText}
                                      </a> 
                                    : headerText
                                }
                            </h5>
                            { content }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}