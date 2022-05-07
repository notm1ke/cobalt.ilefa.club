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
import MdiIcon from '@mdi/react';
import styles from '../../styling/section.module.css';

import { useState } from 'react';
import { Badge } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { useBluefit } from '../../../hooks';
import { isMobile } from 'react-device-detect';
import { mdiChartBellCurve, mdiRadioTower } from '@mdi/js';
import { getDateFromTime, preventAnd, SUMMER_HOURS } from '../../../util';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
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
            text: 'Average vs Live Occupancy for Current Day',
        },
        tooltip: {
            mode: 'index',
        },
        hover: {
            mode: 'index',
        }
    },
};

export const RecHistoricalDailyCard: React.FC = () => {
    const [average, setAverage] = useState(true);
    const [live, setLive] = useState(true);

    const [data, _req, loading, error] = useBluefit(undefined, 'daily');
    if (loading) return <></>;
    if (error || !data?.daily) return <></>;

    let dataset: ChartData<'line', (number | undefined)[]> = {
        
        labels: data!
            .daily!
            .map(({ time }) => time)
            .filter(time => !SUMMER_HOURS
                    || (SUMMER_HOURS
                        && (getDateFromTime(time).getHours() < 18
                            || getDateFromTime(time).getHours() === 18
                            && getDateFromTime(time).getMinutes() === 0))),
        datasets: [
            {
                label: 'average',
                data: data!
                    .daily!
                    .slice(0, data!.daily!.length - 1)
                    .map(({ average }) => Math.round(average)),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                hidden: !average
            },
            {
                label: 'live',
                data: data!
                    .daily!
                    .slice(0, data!.daily!.length - 1)
                    .map(ent => ({
                        ...ent,
                        values: ent.values.length === data!.daily!.slice(0, data!.daily!.length - 1)[0].values.length
                            ? ent.values.slice(-1)[0]
                            : undefined,
                    }))
                    .filter(({ values }) => values !== undefined)
                    .map(({ values }) => values),
                borderColor: 'rgba(101, 184, 104, 1.0)',
                backgroundColor: 'rgba(101, 184, 104, 0.5)',
                hidden: !live
            }
        ],
    };

    let dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()];
    // let delta = data!.daily!.slice(-1)[0].average - data!.daily!.slice(-1)[0].values.slice(-1)[0];

    return (
        <div className="card shadow shadow-lg--hover mt-5 mb-4 mb-xl-0">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-9">
                        <div className={`card-title text-lowercase font-weight-600 text-muted mb-3 ${styles.cardTitle} ${isMobile ? 'text-center' : ''}`}>{dayName} live vs average occupants</div>
                    </div>
                    <div className={`col-md-3 ${isMobile ? 'ml-6 mb-3' : ''}`}>
                        <Badge color="primary" className="ml-3 mr-1 text-lowercase" href="#" onClick={e => preventAnd(e, () => setAverage(!average))}>
                            <MdiIcon path={mdiChartBellCurve} size="12.5px" className="fa-fw" /> Average
                        </Badge>
                        <Badge color="success" className="text-lowercase" href="#" onClick={e => preventAnd(e, () => setLive(!live))}>
                            <MdiIcon path={mdiRadioTower} size="12.5px" className="fa-fw" /> Live
                        </Badge>
                    </div>
                </div>
                <Line options={options} data={dataset} />
            </div>
        </div>
    );
}
