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