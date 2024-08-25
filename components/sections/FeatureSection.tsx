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

import React from 'react';
import styles from '../styling/section.module.css';

import { Badge } from 'reactstrap';

export interface FeatureSectionProps {
    title: string;
    glyph: any;
    alt: string;
    flip?: boolean;
    description: string | JSX.Element;
    className?: string;
    tags: FeatureSectionTags[];
}

export type FeatureSectionTags = {
    icon: JSX.Element;
    color: string;
    display: string;
}

export const FeatureSection: React.FC<FeatureSectionProps> = props => (
    <section className={`section section-lg ${props.className}`}>
        <div className="container">
            <div className="row row-grid align-items-center">
                <div className={`col-md-6 ` + (props.flip ? 'order-md-1' : 'order-md-2')}>
                    <img src={props.glyph} alt={props.alt} className="img-fluid" />
                </div>
                <div className={`col-md-6 ` + (props.flip ? 'order-md-2' : 'order-md-1')}>
                    <div className="pr-md-5">
                        <div className={`col-md-10 ${styles.featureIconPosition} mb-2`}>
                            <h4 className={`${styles.featureTitle} text-white`}>{props.title}</h4>
                        </div>
                        <p className="text-white mb--3">{props.description}</p>
                        <ul className="list-unstyled mt-5">
                            {
                                props.tags.map(tag => 
                                    <li className="py-2" key={tag.display}>
                                        <div className="d-flex align-items-center">
                                            <div><Badge className="badge-circle mr-3" color={tag.color}>{tag.icon}</Badge></div>
                                            <div><h6 className="mb-0 text-white">{tag.display}</h6></div>
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
)