/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import styles from './styling/attribution.module.css';

export interface ContributorButtonProps {
    name: string;
    link: string;
    avatar: JSX.Element;
    platform: string | JSX.Element;
    newTab?: boolean;
    className?: string;
}

export const ContributorButton: React.FC<ContributorButtonProps> = ({ name, link, avatar, platform, newTab, className }) => (
    <a
        href={link}
        target={newTab ? `_blank` : undefined}
        rel={newTab ? `noopener noreferrer` : undefined}
        className={className || 'btn btn-dark bg-ilefa-dark shine btn-icon mt-3 mb-sm-0 text-lowercase'}>
            <div className="row">
                <div className="col-md-3">
                    <span className="btn-inner--icon">{avatar}</span>
                </div>
                <div className="col-md-9">
                    <span className="btn-inner--text text-center font-weight-600">
                        {name}
                        <br/><span className={styles.viaPlatform}>via {platform}</span>
                    </span>
                </div>
            </div>
    </a>
);