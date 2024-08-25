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