import TrackedRooms from '@ilefa/bluesign/tracked.json';

import { replaceAll } from '../../../util';
import { getRoomSchedule } from '@ilefa/bluesign';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method && req.method !== 'GET')
        return res
            .status(405)
            .json({ message: 'Method not allowed' });

    let start = Date.now();
    let { room } = req.query;
    if (room instanceof Array)
        return res
            .status(400)
            .json({ message: 'Invalid room' });

    if (!room)
        return res
            .status(200)
            .json({ rooms: TrackedRooms })

    let result = await getRoomSchedule(replaceAll(room, /\s/, '_'));
    if (!result)
        return res
            .status(404)
            .json({ message: 'Bluesign record not found' });

    return res
        .status(200)
        .json({
            ...result,
            timings: Date.now() - start
        });
}