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

import moment from 'moment';
import MdiIcon from '@mdi/react';
import styles from '../../styling/section.module.css';

import { useEffect } from 'react';
import { getDateFromTime, isRecClosed } from '../../../util';

import {
    mdiCalendarToday,
    mdiCalendarWeek,
    mdiChartMultiline,
    mdiClockOutline
} from '@mdi/js';

import {
    BluefitDailyRecord,
    BluefitWeeklyRecord,
    useBluefit,
    useLocalStorage
} from '../../../hooks';

export interface RecInsightsCardProps {
    data?: number;
}

const avg = (vals: number[]) => {
    let result = (vals.filter(r => r && !isNaN(r)).reduce((a, b) => a + b, 0) / vals.length);
    if (isNaN(result)) return 'none';
    return result.toFixed(1);
};

const avgOf = (vals: BluefitDailyRecord[] | BluefitWeeklyRecord[]) =>
    (vals
        .map(v => v.average)
        .reduce((a, b) => a + b, 0)
    / vals.length).toFixed(1);

const recEpoch = (now = new Date()) => {
    let day = 24 * 60 * 60 * 1000;
    let epoch = new Date('January 31 2022');
    now.setHours(0, 0, 0, 0);
    
    let diff = Math.round((now.getTime() - epoch.getTime()) / day);
    return Math.floor(diff / 7) - 16;
}

const today = (vals: BluefitDailyRecord[], col = recEpoch()) => vals.map(v => v.values[col ?? v.values.length - 1]);

const getArrowIcon = (color: string) => {
    if (color === 'text-success')
        return 'fa fa-arrow-up';
    if (color === 'text-warning')
        return 'fa fa-arrow-right';
    if (color === 'text-danger')
        return 'fa fa-arrow-down';
}

const getChange = (input: number, norm: number) => {
    let color = 'text-warning';
    let percent = input / norm;
    if (percent < 1)
        color = 'text-danger';
    if (percent > 1)
        color = 'text-success';

    return (
        <span className={color}>
            <i className={getArrowIcon(color)}></i> {isNaN(percent) ? 'no data' : `${(Math.abs(1 - percent) * 100).toFixed(1)}%`}
        </span>
    )
}

const getTrend = (current: number, historic: number[]) => {
    if (isRecClosed()) return (
        <span className="text-danger">
            <i className="fas fa-moon"></i> Closed
        </span>
    );

    if (!historic.length || historic.length <= 2) return (
        <span className="text-danger">
            <i className="fa fa-stopwatch fa-fw"></i> not available yet
        </span>
    );

    let avg = Math.floor(historic.slice(-2).reduce((a, b) => a + b, 0) / 2);
    if (avg === 0) return (
        <span className="text-danger">
            <i className="fa fa-times fa-fw"></i> not available
        </span>
    )

    let percent = current / avg;
    if (percent > 0.95 && percent < 1.05) return (
        <span className="text-warning">
            <i className="fa fa-arrow-right fa-fw ml--1 mr--1"></i> stagnant
        </span>
    );

    if (percent < 0.95) return (
        <span className="text-danger">
            <i className="fa fa-arrow-trend-down fa-fw"></i> falling (-{((1 - percent) * 100).toFixed(1)}%)
        </span>
    );

    return (
        <span className="text-success">
            <i className="fa fa-arrow-trend-up fa-fw"></i> rising (+{((percent - 1) * 100).toFixed(1)}%)
        </span>
    );
}

type LocalMaximumPayload = {
    value: number;
    time: string;
}

const getLocalMaximums = (vals: BluefitDailyRecord[]) => {
    let maxes = Array<LocalMaximumPayload>();
    let nums = vals.map(val => ({ value: val.average, time: val.time }));
    for (let i = 1; i < nums.length - 1; ++i) {
        if (nums[i - 1].value < nums[i].value && nums[i].value > nums[i + 1].value)
            maxes.push(nums[i])
    } 

    return maxes;
}

export const RecInsightsCard: React.FC<RecInsightsCardProps> = ({ data }) => {
    const [value, setValue] = useLocalStorage('rec-occupancy', data);
    useEffect(() => () => {
        if (data !== -1)
            setValue(data);
    }, []);

    useEffect(() => {
        if (data !== -1)
            setValue(data);
    }, [data]);

    const [stats, _url, loading, error] = useBluefit(0, new Date().getDay(), 'daily', 'weekly');
    let enabled = stats && !loading && !error;

    return (
        <div className="card shadow shadow-lg--hover mt-3 mb-4 mb-xl-0">
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <div className={`card-title text-lowercase font-weight-600 text-muted mb-1 ${styles.cardTitle}`}>insights</div>
                            {!enabled && <><i className="fa fa-spinner fa-spin fa-fw"></i> Loading..</>}
                            {enabled && (
                                <>
                                    <div className="row">
                                        <div className="col-md-12 mb-2">
                                            <span className={styles.facility}><MdiIcon path={mdiClockOutline} className="fa-fw" /> Today</span>
                                            <br /><span className={styles.sectionStatisticNumber}>
                                                avg: {avg(today(stats!.daily!))}, change: {getChange(parseInt(avg(today(stats!.daily!))), parseInt(avgOf(stats!.weekly!)))}{" "}
                                                trend: {getTrend(value!, today(stats!.daily!.filter(v => moment(getDateFromTime(v.time)).isBefore(new Date()))))}
                                            </span>
                                        </div>
                                        <div className="col-md-12 mb-2">
                                            <span className={styles.facility}><MdiIcon path={mdiCalendarToday} className="fa-fw" /> Daily</span>
                                            <br /><span className={styles.sectionStatisticNumber}>
                                                avg: {avgOf(stats!.daily!)} <br /> peaks: <span className="text-primary">{getLocalMaximums(stats!.daily!).map(val => val.time).join(', ')}</span>
                                            </span>
                                        </div>
                                        <div className="col-md-12 mb-2">
                                            <span className={styles.facility}><MdiIcon path={mdiCalendarWeek} className="fa-fw" /> Weekly</span>
                                            <br /><span className={styles.sectionStatisticNumber}>
                                                avg: {avgOf(stats!.weekly!)}
                                            </span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="col-auto col">
                            <div className={`icon icon-shape bg-primary text-white rounded-circle shadow`}>
                                <MdiIcon path={mdiChartMultiline} size={1.5} />
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
}