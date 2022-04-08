import React from 'react';
import styles from '../../styling/section.module.css';

import { useState } from 'react';
import { Badge } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { useBluefit } from '../../../hooks';

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
};

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
    const [data, _req, loading, error] = useBluefit(undefined, 'weekly');
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

    const labels: string[] = [];
    const labelHours = [6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const labelMinutes = [0, 15, 30, 45];
    for (let hour of labelHours) {
        for (let minute of labelMinutes) {
            labels.push(`${hour}:${minute === 0 ? '00' : minute}`);
        }
    }
    
    let dataset: ChartData<'line', (number | undefined)[]>  = {
        labels,
        datasets: data!.weekly!.map((ent, i) => ({
            label: ent.day,
            data: ent.values.map(({ occupants }) => occupants),
            borderColor: DAY_BORDER_COLORS[i],
            backgroundColor: DAY_COLORS[i],
            hidden: !getters[i],
        }))
    };

    return (
        <div className="card shadow shadow-lg--hover mt-5 mb-4 mb-xl-0">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                        <div className={`card-title text-lowercase font-weight-600 text-muted mb-3 ${styles.cardTitle}`}>daily average occupants</div>
                    </div>
                    <div className="col-md-7">
                        {
                            days.map((day, i) => (
                                <Badge color={colors[i]} className={`${i == 0 ? 'ml--5' : ''} mr-1 text-lowercase`} href="#" onClick={_ => setters[i](!getters[i])}>
                                    {day}
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
