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

    let now = new Date();
    let validatedDate = date
        ? new Date(date)
        : now;
    
    if (validatedDate.getTimezoneOffset() === 0) {
        validatedDate.setHours(validatedDate.getHours() - 4);
        DAYLIGHT_SAVINGS && !date && validatedDate.setHours(validatedDate.getHours() - 1);
    }

    if (!hall) return res
        .status(200)
        .json({
            halls: Object
                .keys(DiningHallType)
                .map(type => ({
                    ...DiningHalls[type.toUpperCase()],
                    status: getEnumKeyByEnumValue(DiningHallStatus, getDiningHallStatus(DiningHallType[type.toUpperCase()], validatedDate))
                }))
        });

    let data = await getMenu(DiningHallType[hall.toUpperCase()], validatedDate);
    if (!data)
        return res
            .status(502)
            .json({ message: 'Bad Gateway' });
    
    // if weekend, merge breakfast + brunch menus, since they are the same - and will be able to display brunch tab
    if (validatedDate.getDay() === 0 || validatedDate.getDay() === 6) {
        let merged = data.meals.map(meal => {
            if (meal.name === 'Lunch')
                meal.name = 'Brunch'

            return meal;
        });

        data.meals = merged
    }

    let status = getEnumKeyByEnumValue(DiningHallStatus, getDiningHallStatus(DiningHallType[hall.toUpperCase()], validatedDate));
    if (data.meals.length === 0 || data.meals.every(meal => meal.stations.length === 0))
        status = DiningHallStatus.CLOSED;

    return res
        .status(200)
        .json({
            ...data,
            status,
        });
}