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

    let start = Date.now();
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
                        meals: data.meals, status,
                    }
                })),
            timings: Date.now() - start
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
                        
                    return {
                        ...DiningHalls[type.toUpperCase()],
                        hasMeals: data.meals.length > 0 && data.meals.some(meal => meal.stations.length > 0),
                        status
                    }
                })),
            timings: Date.now() - start
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
            timings: Date.now() - start
        });
}