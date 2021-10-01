import { getEnumKeyByEnumValue } from '../../../util';
import { NextApiRequest, NextApiResponse } from 'next';

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

    let validatedDate = date
        ? new Date(date)
        : new Date();

    console.log('-'.repeat(50));
    console.log('validatedDate =', validatedDate.getTime(), '| time = ' + validatedDate.getHours() + ':' + validatedDate.getMinutes(), '| offset =', validatedDate.getTimezoneOffset() / 60);
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

    let status = getEnumKeyByEnumValue(DiningHallStatus, getDiningHallStatus(DiningHallType[hall.toUpperCase()], validatedDate))
    console.log('hall =', hall.toUpperCase(), '| status =', status);
    return res
        .status(200)
        .json({
            ...data,
            status,
        });
}