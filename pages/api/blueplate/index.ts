import axios from 'axios';

import { DateTime } from 'luxon';
import { getEnumKeyByEnumValue } from '../../../util';
import { NextApiRequest, NextApiResponse } from 'next';

import {
    DiningHalls,
    DiningHallStatus,
    DiningHallType,
    getDiningHallStatus,
    getMenu
} from '@ilefa/blueplate';

axios.interceptors.request.use((rej) => {
    console.log('->', rej.method, rej.url, rej.params, rej.data);
    return rej;
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method && req.method !== 'GET')
        return res
            .status(405)
            .json({ message: 'Method not allowed' });

    let { hall, date } = req.query;
    if (hall instanceof Array || date instanceof Array)
        return res
            .status(400)
            .json({ message: 'Invalid payload' });

    if (hall && !DiningHallType[hall.toUpperCase()])
        return res
            .status(400)
            .json({ message: 'Invalid dining hall' });

    if (date && !/^\d{2}([./-])\d{2}\1\d{4}$/.test(date))
        return res
            .status(400)
            .json({ message: 'Invalid date' });

    if (date && !hall)
        return res
            .status(400)
            .json({ message: 'Must specify dining hall to use historical lookup' });

    let now = DateTime.now().setZone('America/New_York');
    let validatedDate = now;
    if (date) validatedDate = DateTime
        .fromObject({
            year: parseInt(date.split('-')[2]),
            month: parseInt(date.split('-')[0]),
            day: parseInt(date.split('-')[1]),
            hour: 3,
            minute: 33,
            second: 33,
        }, { zone: 'America/New_York' });

    console.log(`${date ? date : 'NOW'}`, validatedDate.toMillis(), validatedDate.toJSDate().getTime(), validatedDate.toJSDate(), validatedDate.toJSDate().getTime() === validatedDate.toMillis())

    if (!hall) return res
        .status(200)
        .json({
            halls: await Promise.all(Object
                .keys(DiningHallType)
                .map(async type => {
                    let data = await getMenu(DiningHallType[type.toUpperCase()], validatedDate.toJSDate());
                    let status = getEnumKeyByEnumValue(DiningHallStatus, getDiningHallStatus(DiningHallType[type.toUpperCase()], validatedDate.toJSDate()));
                    if (status !== 'CLOSED' && (data.meals.length === 0 || data.meals.every(meal => meal.stations.length === 0)))
                        status = 'CLOSED';
                        
                    return { ...DiningHalls[type.toUpperCase()], status };
                }))
        });

    let data = await getMenu(DiningHallType[hall.toUpperCase()], validatedDate.toJSDate());
    if (!data)
        return res
            .status(502)
            .json({ message: 'Bad Gateway' });
    
    // if weekend, merge breakfast + brunch menus, since they are the same - and will be able to display brunch tab
    if (validatedDate.weekday === 6 || validatedDate.weekday === 7) {
        let merged = data.meals.map(meal => {
            if (meal.name === 'Lunch')
                meal.name = 'Brunch'

            return meal;
        });

        data.meals = merged
    }

    let status = getEnumKeyByEnumValue(DiningHallStatus, getDiningHallStatus(DiningHallType[hall.toUpperCase()], validatedDate.toJSDate()));
    if (status !== 'CLOSED' && (data.meals.length === 0 || data.meals.every(meal => meal.stations.length === 0)))
        status = 'CLOSED';

    return res
        .status(200)
        .json({
            ...data,
            status,
        });
}