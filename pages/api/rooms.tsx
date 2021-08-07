import Classrooms from '@ilefa/husky/classrooms.json';

import { NextApiRequest, NextApiResponse } from 'next';
import { BuildingMaps, isValidRoomQueryMode, RoomQueryMode } from '../../util';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method && req.method !== 'GET')
        return res
            .status(405)
            .json({ message: 'Method not allowed' });

    let mode: RoomQueryMode = 'name';
    if (req.query.mode && req.query.mode instanceof Array)
        return res
            .status(400)
            .json({ message: 'Invalid query payload' });

    if (req.query.mode) {
        if (!isValidRoomQueryMode(req.query.mode))
            return res
                .status(400)
                .json({ message: 'Invalid query mode' })
        mode = req.query.mode.toLowerCase() as RoomQueryMode;    
    }

    return res
        .status(200)
        .json({
            rooms: Classrooms.map(ent => {
                if (mode === 'name')
                    return ent.name;

                return {
                    ...ent,
                    building: {
                        name: ent.building.name,
                        code: ent.building.code,
                        mapUrl: BuildingMaps[ent.building.code]
                    },
                    threeSixtyView: ent.threeSixtyView || null,
                };
            })
        });
}