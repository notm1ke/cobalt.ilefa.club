import TrackedRooms from '@ilefa/bluesign/tracked.json';

import { replaceAll } from '../../../util';
import { BuildingCode } from '@ilefa/husky';
import { getRoomSchedule } from '@ilefa/bluesign';
import { NextApiRequest, NextApiResponse } from 'next';

const isValidSite = (site: string): site is BuildingCode =>
    TrackedRooms
        .some(r => r
            .toLowerCase()
            .startsWith(site.toLowerCase()));

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method && req.method !== 'GET')
        return res
            .status(405)
            .json({ message: 'Method not allowed' });

    let start = Date.now();
    let { room, site } = req.query;
    if (room instanceof Array)
        return res
            .status(400)
            .json({ message: 'Invalid room' });

    // GET /api/bluesign
    if (!room && !site)
        return res
            .status(200)
            .json({ rooms: TrackedRooms })

    // GET /api/bluesign?site=<...site>
    if (site) {
        if (site instanceof Array)
            return res
                .status(400)
                .json({ message: 'Invalid site' });
        
        let sites = [site].filter(isValidSite);
        if (site.includes(','))
            sites = site
                .split(',')
                .filter(isValidSite);

        if (sites.length === 0)
            return res
                .status(400)
                .json({ message: 'No valid sites provided in request' });

        let roomsPerSite = sites.map(site => TrackedRooms
            .filter(r => r.toLowerCase().startsWith(site.toLowerCase()))
            .map(room => replaceAll(room, /\s/, '_')));

        let siteSchedules = await Promise.all(
            roomsPerSite.map(rooms => Promise.all(
                rooms.map(async room => await getRoomSchedule(room)))));

        return res
            .status(200)
            .json({
                sites: siteSchedules.map((ent, i) => ({
                    name: sites[i],
                    schedules: ent
                })),
                timings: Date.now() - start
            });
    }

    // GET /api/bluesign?room=<room>
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