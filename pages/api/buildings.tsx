import Classrooms from '@ilefa/husky/classrooms.json';

import { BuildingCodes } from '../../util';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method && req.method !== 'GET')
        return res
            .status(405)
            .json({ message: 'Method not allowed' });

    return res
        .status(200)
        .json({
            buildings: Object
                .keys(BuildingCodes)
                .map(ent => ({
                    code: ent,
                    name: BuildingCodes[ent],
                    rooms: Classrooms.filter(room => room.building.code === ent)
                }))
        });
}