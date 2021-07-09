import Classrooms from '@ilefa/husky/classrooms.json';

import { BuildingCode } from '@ilefa/husky';
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
                .keys(BuildingCode)
                .map(ent => ({
                    code: ent,
                    name: BuildingCode[ent],
                    rooms: Classrooms.filter(room => room.name.startsWith(ent))
                }))
        });
}