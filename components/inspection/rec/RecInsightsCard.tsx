/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import MdiIcon from '@mdi/react';
import styles from '../../styling/section.module.css';

import { useEffect } from 'react';
import { isRecClosed } from '../../../util';

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

const avg = (vals: number[]) => (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);

const avgOf = (vals: BluefitDailyRecord[] | BluefitWeeklyRecord[]) =>
    (vals
        .map(v => v.average)
        .reduce((a, b) => a + b, 0)
    / vals.length).toFixed(1);

const today = (vals: BluefitDailyRecord[]) => vals.map(v => v.values[v.values.length - 1]);

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
            <i className={getArrowIcon(color)}></i> {((1 - percent) * 100).toFixed(1)}%
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

    let avg = Math.floor(historic.reduce((a, b) => a + b, 0) / historic.length);
    if (avg === 0) return (
        <span className="text-danger">
            <i className="fa fa-times fa-fw"></i> not available
        </span>
    )

    let percent = current / avg;
    if (percent === 1) return (
        <span className="text-warning">
            <i className="fa fa-arrow-right fa-fw"></i> stagnating
        </span>
    );

    if (percent < 1) return (
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
    let nums = vals.map(val => ({ value: val.average, time: val.time }));
    let maxes = Array<LocalMaximumPayload>()
    for (let i = 1; i < nums.length - 1; ++i) {
        if (nums[i-1].value < nums[i].value && nums[i].value > nums[i+1].value)
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

    const [stats, _url, loading, error] = useBluefit(0, 'daily', 'weekly');
    let enabled = stats && !loading && !error && value !== -1;

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
                                                trend: {getTrend(data!, today(stats!.daily!))}
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