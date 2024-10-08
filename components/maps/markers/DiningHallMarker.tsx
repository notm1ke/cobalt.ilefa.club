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

import { MarkerPayload } from '../../../hooks';

import {
    getDateFromTime,
    getDiningHallStatusName,
    getLatestTimeValue,
    MealHourEntry,
    StandardMealHours
} from '../../../util';

export interface DiningHallMarkerProps {
    marker: MarkerPayload;
}

const getTimeRangeSortingKey = (a: string, b: string) => {
    let aAM = a.includes('am');
    let bAM = b.includes('am');

    return aAM === bAM
        ? parseInt(a.split(':')[0]) - parseInt(a.split(':')[0])
        : aAM
            ? -1
            : 1;
}

const getMealHourEntries = (hours: MealHourEntry[], now: Date) =>
    hours
        .filter(h => h.days.includes(now.getDay()))
        .sort((a, b) => getTimeRangeSortingKey(a.start, b.start))
        .map((h, i) => ({
            ...h,
            start: getDateFromTime(h.start),
            end: getDateFromTime(h.end),
            index: i
        }));

const getMealServiceString = (hours: MealHourEntry[]) => {
    let now = new Date();
    let entries = getMealHourEntries(hours, now);

    let status = entries.find(h => now >= h.start && now <= h.end);
    if (!status) {
        let nextDay = now.getHours() > entries[entries.length - 1].end.getHours();
        if (nextDay) {
            let date = new Date(now);
            date.setDate(date.getDate() + 1);
            entries = getMealHourEntries(hours, date);
        }
        
        status = { name: 'Closed', start: entries[0].start, end: entries[0].end, index: -1, days: [] };
    }
    
    let isLast = status ? status.index === entries.length - 1 : true;
    let until = isLast
        ? status.end
        : entries[status.index + 1].start;

    if (status.name === 'Closed' && until.getDate() == now.getDate())
        until.setDate(until.getDate() + 1);

    let timeDiff = getLatestTimeValue(until.getTime() - Date.now());
    let next = <>in <b>{timeDiff}</b></>;
    if ((status.name !== 'Reset' && status.name !== 'Closed') && !isLast)
        next = <>for another <b>{timeDiff}</b></>;

    return <>Meal service will {isLast ? 'end' : (status.name === 'Reset' || status.name === 'Closed') ? 'resume' : 'continue'} {next}.</>;
}

export const DiningHallMarker: React.FC<DiningHallMarkerProps> = ({ marker }) => {
    let hallType = marker.diningHallType;
    if (!hallType) throw new Error('Cannot instantiate DiningHallMarker without a diningHallType');

    let now = new Date();
    let hours = StandardMealHours[hallType] as MealHourEntry[];
    let entries = getMealHourEntries(hours, now);

    let status = entries.find(h => now >= h.start && now <= h.end);
    if (!status) {
        let nextDay = now.getHours() > entries[entries.length - 1].end.getHours();
        if (nextDay) {
            let date = new Date(now);
            date.setDate(date.getDate() + 1);
            entries = getMealHourEntries(hours, date);
        }
        
        status = { name: 'Closed', start: entries[0].start, end: entries[0].end, index: -1, days: [] };
    }
    
    return (
        <>
            {
                marker.address && (
                    <><i className="fas fa-location-arrow fa-fw"></i> <i>{marker.address}</i> <br /><br /></>
                )
            }
            {marker.name.split('Dining Hall')[0]} is {getDiningHallStatusName(status.name)}. <br />
            {getMealServiceString(hours)}
            <br /><br />

            <span className="text-primary"><i className="fa fa-link fa-fw"></i> Click for more information</span>
        </>
    );
}