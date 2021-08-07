import axios from 'axios';
import cheerio from 'cheerio';
import Classrooms from '@ilefa/husky/classrooms.json';

import { Classroom } from '@ilefa/husky';
import { NextApiRequest, NextApiResponse } from 'next';
import { BuildingMaps, CompleteRoomPayload, ROOM_NAME_REGEX } from '../../../util';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method && req.method !== 'GET')
        return res
            .status(405)
            .json({ message: 'Method not allowed' });

    let start = Date.now();
    let { name } = req.query;
    if (name instanceof Array)
        return res
            .status(400)
            .json({ message: 'Invalid room payload' });

    if (!name || !ROOM_NAME_REGEX.test(name))
        return res
            .status(400)
            .json({ message: 'Invalid room name' });

    let mappings = Classrooms.find(mapping => mapping.name === name);
    if (!mappings)
        return res
            .status(404)
            .json({ message: 'Room not found' });

    let streamUrl: string | undefined;
    if (mappings.liveStreamUrl) {
        let $ = await axios
            .get(mappings.liveStreamUrl)
            .then(res => res.data)
            .then(data => cheerio.load(data));
    
        let src = $('meta[property="og:video:url"]');
        if (!src) return res.status(502).json({
            message: 'Missing response payload'
        });

        streamUrl = src.attr('content');
    }

    let complete: CompleteRoomPayload = {
        ...mappings as Classroom,
        building: {
            name: mappings.building.name,
            code: mappings.building.code,
            campus: mappings.building.campus,
            mapUrl: BuildingMaps[mappings.building.code]
        },
        liveStreamUrl: streamUrl
    }

    return res
        .status(200)
        .json({
            ...complete,
            timings: Date.now() - start
        });
}