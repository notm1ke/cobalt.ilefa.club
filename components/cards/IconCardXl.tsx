/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import styles from '../styling/card.module.css';

export interface IconCardXlProps {
    icon?: string;
    iconColor?: string;
    headerText?: string;
    headerHref?: string;
    headerShine?: boolean;
    headerColor?: string;
}

export const IconCardXl: React.FC<IconCardXlProps> = props => {
    let icon = props.icon || 'fa fa-exclamation-triangle';
    let iconColor = props.iconColor || 'bg-primary';
    let headerText = props.headerText || 'Icon Card';
    let headerHref = props.headerHref || undefined;
    let headerShine = props.headerShine || false;
    let headerColor = props.headerColor || 'text-primary';

    return (
        <div className="col-lg-12 align-items-stretch">
            <div className={`card shadow shadow-lg--hover mt-5 ${styles.rgCard}`}>
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
                            { props.children }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}