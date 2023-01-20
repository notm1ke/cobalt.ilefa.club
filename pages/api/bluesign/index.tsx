/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import TrackedRooms from '@ilefa/bluesign/tracked.json';

import { getRoomSchedule } from '@ilefa/bluesign';
import { NextApiRequest, NextApiResponse } from 'next';
import { BuildingCode, CampusType, isCampusType } from '@ilefa/husky';
import { detectSiteFromRoom, getBluesignCode, getCurrentAndNextEvents, replaceAll } from '../../../util';

const isValidSite = (site: string): site is BuildingCode =>
    TrackedRooms
        .some(r => r
            .toLowerCase()
            .startsWith(site.toLowerCase()));

const isFlagPresent = (flag?: string | string[]): flag is string | string[] => flag !== null && flag !== undefined;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method && req.method !== 'GET')
        return res
            .status(405)
            .json({ message: 'Method not allowed' });

    let start = Date.now();
    let { room, site, free } = req.query;
    if (room instanceof Array)
        return res
            .status(400)
            .json({ message: 'Invalid room' });

    // GET /api/bluesign
    if (!room && !site && !isFlagPresent(free))
        return res
            .status(200)
            .json({ rooms: TrackedRooms })

    // GET /api/bluesign?site=<...site>
    if (site) {
        if (site instanceof Array)
            return res
                .status(400)
                .json({ message: 'Invalid site' });
        
        let sites = [site].map(getBluesignCode).filter(isValidSite);
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
                    schedules: ent.filter(s => !!s)
                })),
                timings: Date.now() - start
            });
    }

    // GET /api/bluesign?free=<..campuses>
    if (isFlagPresent(free)) {
        if (free instanceof Array)
            return res
                .status(400)
                .json({ message: 'Invalid mode for `free` payload' });

        let campuses = [free].filter(isCampusType).map(c => c as CampusType);
        if (free.includes(','))
            campuses = free
                .split(',')
                .filter(isCampusType);

        if (campuses.length === 0)
            campuses = ['any'];

        let rooms = TrackedRooms.map(room => ({ room, site: detectSiteFromRoom(room) }));
        let selectors = campuses.filter(site => site !== 'any');
        if (selectors.length) rooms = rooms.filter(r => campuses.includes(r.site as CampusType));

        let roomSchedules = await Promise.all(
            rooms.map(async r => await getRoomSchedule(r.room))
        );

        let freeRooms = roomSchedules
            .map(room => ({ room, rsn: getCurrentAndNextEvents(room?.entries) }))
            .filter(({ room, rsn }) => room && !rsn[0])
            .map(({ room, rsn }) => ({
                room: { 
                    room: room.room,
                    entries: room.entries,
                },
                nextEvents: rsn[1] ?? []
            }));

        let bySite = freeRooms.map(r => rooms.find(rm => rm.room.replace(/_/g, ' ').toLowerCase() === r.room.room.replace(/\s_/g, '').toLowerCase())?.site);
        let counts = bySite.reduce((acc, site) => {
            if (!acc[site as any]) acc[site as any] = 0;
            acc[site as any]++;
            return acc;
        }, {} as Record<string, number>);

        return res
            .status(200)
            .json({
                rooms: freeRooms,
                sites: counts,
                timings: Date.now() - start
            });
    }

    // GET /api/bluesign?room=<room>
    let result = await getRoomSchedule(replaceAll(room!, /\s/, '_'));
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