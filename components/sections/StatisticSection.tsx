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