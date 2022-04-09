import { NextApiRequest, NextApiResponse } from 'next';
import { DAYLIGHT_SAVINGS, getEnumKeyByEnumValue } from '../../../util';

import {
    DiningHalls,
    DiningHallStatus,
    DiningHallType,
    getDiningHallStatus,
    getMenu
} from '@ilefa/blueplate';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method && req.method !== 'GET')
        return res
            .status(405)
            .json({ message: 'Method not allowed' });

    let { hall, date, mode } = req.query;
    if (hall instanceof Array || date instanceof Array || mode instanceof Array)
        return res
            .status(400)
            .json({ message: 'Invalid payload' });

    if (!mode && hall && !DiningHallType[hall.toUpperCase()])
        return res
            .status(400)
            .json({ message: 'Invalid dining hall' });

    if (date && !/^\d{2}([./-])\d{2}\1\d{4}$/.test(date))
        return res
            .status(400)
            .json({ message: 'Invalid date' });

    if (date && !hall && !mode)
        return res
            .status(400)
            .json({ message: 'Must specify dining hall to use historical lookup' });

    let now = new Date();
    let validatedDate = date
        ? new Date(date)
        : now;
    
    let customDate = now.getTime() !== validatedDate.getTime();
    if (!customDate && validatedDate.getTimezoneOffset() === 0) {
        validatedDate.setHours(validatedDate.getHours() - 4);
        DAYLIGHT_SAVINGS && validatedDate.setHours(validatedDate.getHours() - 1);
    }
    
    // fetch all meals and include in the payload
    if (mode && mode.toLowerCase() === 'site' && !hall)
        return res.status(200).json({
            halls: await Promise.all(Object
                .keys(DiningHallType)
                .map(async type => {
                    let data = await getMenu(DiningHallType[type.toUpperCase()], validatedDate);
                    let status = getEnumKeyByEnumValue(DiningHallStatus, getDiningHallStatus(DiningHallType[type.toUpperCase()], validatedDate));
                    if (status !== 'CLOSED' && (data.meals.length === 0 || data.meals.every(meal => meal.stations.length === 0)))
                        status = 'CLOSED';
                        
                    return {
                        ...DiningHalls[type.toUpperCase()],
                        meals: data.meals, status
                    };
                }))
        })

    // fetch all statuses, but do not include meals
    if (!hall) return res
        .status(200)
        .json({
            halls: await Promise.all(Object
                .keys(DiningHallType)
                .map(async type => {
                    let data = await getMenu(DiningHallType[type.toUpperCase()], validatedDate);
                    let status = getEnumKeyByEnumValue(DiningHallStatus, getDiningHallStatus(DiningHallType[type.toUpperCase()], validatedDate));
                    if (status !== 'CLOSED' && (data.meals.length === 0 || data.meals.every(meal => meal.stations.length === 0)))
                        status = 'CLOSED';
                        
                    return { ...DiningHalls[type.toUpperCase()], status };
                }))
        });

    let data = await getMenu(DiningHallType[hall.toUpperCase()], validatedDate);
    if (!data)
        return res
            .status(502)
            .json({ message: 'Bad Gateway' });
    
    // if weekend, merge breakfast + brunch menus, since they are the same - and will be able to display brunch tab
    if (validatedDate.getDay() === 6 || validatedDate.getDay() === 7) {
        let merged = data.meals.map(meal => {
            if (meal.name === 'Lunch')
                meal.name = 'Brunch'

            return meal;
        });

        data.meals = merged
    }

    let status = getEnumKeyByEnumValue(DiningHallStatus, getDiningHallStatus(DiningHallType[hall.toUpperCase()], validatedDate));
    if (status !== 'CLOSED' && (data.meals.length === 0 || data.meals.every(meal => meal.stations.length === 0)))
        status = 'CLOSED';

    return res
        .status(200)
        .json({
            ...data,
            status,
        });
}