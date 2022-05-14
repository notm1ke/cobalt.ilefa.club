/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import axios from 'axios';

import { getOccupancy } from '@ilefa/bluefit';
import { BluefitDailyRecord } from '../../../hooks';
import { isValidRecQueryMode } from '../../../util';
import { NextApiRequest, NextApiResponse } from 'next';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

type TimeOccupancyKeyPair = {
    time: string;
    occupants: number;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method && req.method !== 'GET')
        return res
            .status(405)
            .json({ message: 'Method not allowed' });

    let start = Date.now();
    let { mode, day } = req.query;
    if (!mode || !day || mode instanceof Array || day instanceof Array)
        return res
            .status(400)
            .json({ message: 'Bad Request' });

    let modes = mode.split(',');
    if (!modes.every(m => isValidRecQueryMode(m)))
        return res
            .status(400)
            .json({ message: 'Invalid query mode' });
            
    let payload = {} as any;
    let target = parseInt(day);

    if (isNaN(target)) 
        return res
            .status(400)
            .json({ message: 'Non-numeric day' });

    for (let mode of modes) {
        if (mode === 'occupants') {
            let occupants = (await getOccupancy() as any).occupants;
            payload[mode] = (!occupants || occupants === -1)
                ? await getLatestOccupancy(target)
                : occupants;
        }
        if (mode === 'daily')
            payload[mode] = await getDailyOccupancy(target);
        if (mode === 'weekly')
            payload[mode] = await getWeeklyOccupancy();
    }

    return res
        .status(200)
        .json({
            ...payload,
            timings: Date.now() - start
        });
}

const getLatestOccupancy = async (day: number) => {
    let dayName = DAYS[day];
    let url = `https://sheets.googleapis.com/v4/spreadsheets/1BDgBidhnUfM2-4SNW4WoWOpsdW7gn-eVkVx1_PqZnrI/values/${dayName}!A2:AV1000?key=${process.env.GOOGLE_SHEETS_TOKEN}`;
    let data = await axios
        .get(url)
        .then(res => res.data)
        .then(res => res.values)
        .catch(_ => null);

    if (!data)
        return null;

    let last = data[data.length - 1];
    let [_, ...raw] = last;
    let val = raw[raw.length - 1];

    return val;
}

const getDailyOccupancy = async (day: number) => {
    let dayName = DAYS[day];
    let url = `https://sheets.googleapis.com/v4/spreadsheets/1BDgBidhnUfM2-4SNW4WoWOpsdW7gn-eVkVx1_PqZnrI/values/${dayName}!A2:AV1000?key=${process.env.GOOGLE_SHEETS_TOKEN}`;
    let data = await axios
        .get(url)
        .then(res => res.data)
        .then(res => res.values)
        .catch(_ => null);

    if (!data)
        return null;

    let result: BluefitDailyRecord[] = data.map(d => {
        let [time, ...raw] = d;
        let values = raw
            .map(v => parseInt(v))
            .filter(v => !isNaN(v));

        return {
            time, values,
            average: values.reduce((a, b) => a + b, 0) / values.length
        }
    });

    return result;
}

const getWeeklyOccupancy = async () => {
    let url = `https://sheets.googleapis.com/v4/spreadsheets/1BDgBidhnUfM2-4SNW4WoWOpsdW7gn-eVkVx1_PqZnrI/values/Average!A2:Z1000?key=${process.env.GOOGLE_SHEETS_TOKEN}`;
    let data = await axios
        .get(url)
        .then(res => res.data)
        .then(res => res.values)
        .catch(_ => null);

    if (!data)
        return null;

    let days = DAYS.map(d => ({
        day: d,
        values: Array<TimeOccupancyKeyPair>(),
        average: 0
    }));

    for (let d of data) {
        let [time, ...raw] = d;
        let values = raw
            .map(v => parseInt(v))
            .filter(v => !isNaN(v))

        values.forEach((v: number, i: number) => days[i].values.push({ time, occupants: v }));
    }

    days.forEach(d => {
        d.values.forEach(v => d.average += v.occupants);
        d.average /= d.values.length;
    });

    return days;
}
