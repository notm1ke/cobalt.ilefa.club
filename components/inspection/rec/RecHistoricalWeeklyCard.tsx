/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import React from 'react';
import styles from '../../styling/section.module.css';

import { useState } from 'react';
import { Badge } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { getDateFromTime, preventAnd, SUMMER_HOURS } from '../../../util';
import { useBluefit } from '../../../hooks';
import { isMobile } from 'react-device-detect';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options: any = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
            display: false
        },
        title: {
            display: false,
            text: 'Weekly Occupancy Averages',
        },
        tooltip: {
            mode: 'index',
        },
        hover: {
            mode: 'index',
        }
    }
}

const DAY_COLORS = [
    "rgba(231, 76, 60, 1.0)",
    "rgba(243, 156, 18, 1.0)",
    "rgba(241, 196, 15, 1.0)",
    "rgba(46, 204, 113, 1.0)",
    "rgba(22, 160, 133, 1.0)",
    "rgba(41, 128, 185, 1.0)",
    "rgba(155, 89, 182, 1.0)",
];

const DAY_BORDER_COLORS = [
    "rgba(231, 76, 60, 0.5)",
    "rgba(243, 156, 18, 0.5)",
    "rgba(241, 196, 15, 0.5)",
    "rgba(46, 204, 113, 0.5)",
    "rgba(22, 160, 133, 0.5)",
    "rgba(41, 128, 185, 0.5)",
    "rgba(155, 89, 182, 0.5)",
];

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const colors = ['danger', 'warning', 'yellow', 'success', 'primary-light', 'primary', 'purple'];

export const RecHistoricalWeeklyCard: React.FC = () => {
    const [data, _req, loading, error] = useBluefit(undefined, new Date().getDay(), 'weekly');
    const [monday, setMonday] = useState(true);
    const [tuesday, setTuesday] = useState(true);
    const [wednesday, setWednesday] = useState(true);
    const [thursday, setThursday] = useState(true);
    const [friday, setFriday] = useState(true);
    const [saturday, setSaturday] = useState(true);
    const [sunday, setSunday] = useState(true);
    
    if (loading) return <></>;
    if (error || !data?.weekly) return <></>;
    
    const getters = [sunday, monday, tuesday, wednesday, thursday, friday, saturday];
    const setters = [setSunday, setMonday, setTuesday, setWednesday, setThursday, setFriday, setSaturday];

    let labels = [...new Set(Array<string>().concat.apply([], data!.weekly.map(day => day.values.map(val => val.time))))];
    let dataset: ChartData<'line', (number | undefined)[]> = {
        labels: labels.filter(time => !SUMMER_HOURS
            || (SUMMER_HOURS
                && (getDateFromTime(time).getHours() < 18
                    || getDateFromTime(time).getHours() === 18
                    && getDateFromTime(time).getMinutes() === 0))),
        datasets: data!.weekly!.map((ent, i) => ({
            label: ent.day,
            data: ent.values.map(({ occupants }) => occupants),
            borderColor: DAY_BORDER_COLORS[i],
            backgroundColor: DAY_COLORS[i],
            hidden: !getters[i],
        }))
    }

    return (
        <div className="card shadow shadow-lg--hover mt-5 mb-4 mb-xl-0">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                        <div className={`card-title text-lowercase font-weight-600 text-muted mb-3 ${styles.cardTitle} ${isMobile ? 'text-center' : ''}`}>daily average occupants</div>
                    </div>
                    <div className={`col-md-7 ${isMobile ? 'ml-7 mb-3' : ''}`}>
                        {
                            days.map((day, i) => (
                                <Badge color={!getters[i] ? 'dark' : colors[i]} className={`${i == 0 ? 'ml--5' : ''} mr-1 text-lowercase`} href="#" onClick={e => preventAnd(e, () => setters[i](!getters[i]))}>
                                    {isMobile ? day.substring(0, 2) : day}
                                </Badge>
                            ))
                        }
                    </div>
                </div>
                <Line options={options} data={dataset} />
            </div>
        </div>
    );
}
