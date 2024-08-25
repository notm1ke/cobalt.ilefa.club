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
import CountUp from 'react-countup';
import styles from '../styling/section.module.css';

import { getLastSemester, inferIcon, numberProvided } from '../../util';

export interface StatisticSectionProps {
    statistics: Statistic[];
    header?: JSX.Element;
    section?: boolean;
    className?: string;
}

export interface Statistic {
    name: string;
    amount: number;
    icon: string | JSX.Element;
    iconColor: string;
    loading?: boolean;
    change?: number;
    changePeriod?: string;
    countUp?: boolean;
}

export const StatisticCard: React.FC<Statistic> = ({ name, amount, icon, iconColor, loading, change, changePeriod, countUp }) => (
    <div className={`card shadow shadow-lg--hover mt-5 mb-4 mb-xl-0`}>
        <div className="card-body">
            <div className="row">
                <div className="col">
                    <div className={`card-title text-lowercase font-weight-600 text-muted mb-0 ${styles.cardTitle}`}>{name}</div>
                    <span className={`h2 font-weight-bold mb-0 ${styles.cardNumber}`}>
                        {loading && <i className={`fa fa-spinner fa-spin fa-fw ${styles.loaderIcon}`}></i>}
                        {!loading && countUp && <CountUp end={amount} duration={2.25} separator="," />}
                        {!loading && !countUp && amount.toLocaleString()}
                    </span>
                </div>
                <div className="col-auto col">
                    <div className={`icon icon-shape bg-${iconColor} text-white rounded-circle shadow`}>
                        { inferIcon(icon) }
                    </div>
                </div>
            </div>
            {
                numberProvided(change) && (
                    <p className="mt-3 mb-0 text-muted text-sm">
                        <span className={`text-${change! > 0 ? 'success' : change === 0 ? 'warning' : 'danger'} mr-2`}>
                            <i className={`fa fa-arrow-${change! > 0 ? 'up' : change === 0 ? 'right' : 'down'}`} /> {change?.toLocaleString()}%
                        </span>{" "}
                        <span className="text-nowrap">{changePeriod ?? `since ${getLastSemester()}`}</span>
                    </p>
                )
            }
        </div>
    </div>
)

export const StatisticSection: React.FC<StatisticSectionProps> = ({ statistics, header, section, className }) => (
    <>
        {section && (
            <section className={`section section-lg ${className ?? ''}`}>
                <div className="container">
                    {header}
                    <div className="row row-grid align-items-center">
                        <div className={`card-deck ${styles.cardDeckFlex} ${styles.cardDeckTop} col-sm-12`}>
                            {statistics.map(statistic => (
                                <StatisticCard
                                    key={statistic.name}
                                    name={statistic.name}
                                    amount={statistic.amount}
                                    icon={statistic.icon}
                                    iconColor={statistic.iconColor}
                                    change={statistic.change}
                                    changePeriod={statistic.changePeriod}
                                    countUp={statistic.countUp} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        )}
        
        {!section && (
            <div className="row row-grid align-items-center">
                <div className={`card-deck ${styles.cardDeckFlex} ${styles.cardDeckTop}`}>
                    {statistics.map(statistic => (
                        <StatisticCard
                            key={statistic.name}
                            name={statistic.name}
                            amount={statistic.amount}
                            icon={statistic.icon}
                            iconColor={statistic.iconColor}
                            loading={statistic.loading}
                            change={statistic.change}
                            changePeriod={statistic.changePeriod}
                            countUp={statistic.countUp} />
                    ))}
                </div>
            </div>
        )}
    </>
    
)