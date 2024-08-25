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

import CourseMappings from '@ilefa/husky/courses.json';
import RmpMappings from '@ilefa/husky/rmpIds.json';
import Classrooms from '@ilefa/husky/classrooms.json';

import { BuildingCode } from '@ilefa/husky';
import { NextApiRequest, NextApiResponse } from 'next';
import { isValidStatisticsQueryMode, StatisticsQueryMode } from '../../util';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let { mode } = req.query;
    if (mode instanceof Array)
        return res
            .status(400)
            .json({ message: 'Invalid query payload' });

    if (!mode)
        return res
            .status(400)
            .json({ message: 'Query mode is required' });

    let raw = mode.split(',');
    if (raw.some(mode => !isValidStatisticsQueryMode(mode)))
        return res
            .status(400)
            .json({ message: 'Invalid query mode' });

    let modes = raw as StatisticsQueryMode[];

    let payload = {
        courses: 0,
        professors: 0,
        rooms: 0,
        buildings: 0,
        assets: 0
    }

    if (useMode('full', modes)) {
        payload.courses = getStatistic('courses');
        payload.professors = getStatistic('professors');
        payload.rooms = getStatistic('rooms');
        payload.buildings = getStatistic('buildings');
        payload.assets = getStatistic('assets');
    }

    if (!useMode('full', modes)) {
        if (useMode('courses', modes)) payload.courses = getStatistic('courses');
        if (useMode('professors', modes)) payload.professors = getStatistic('professors');
        if (useMode('rooms', modes)) payload.rooms = getStatistic('rooms');
        if (useMode('buildings', modes)) payload.buildings = getStatistic('buildings');
        if (useMode('assets', modes)) payload.assets = getStatistic('assets');
    }

    return res.json(payload);
}

const getStatistic = (mode: StatisticsQueryMode) => {
    if (mode === 'courses') return (CourseMappings as any).length;
    if (mode === 'professors') return RmpMappings.length;
    if (mode === 'rooms') return Classrooms.length;
    if (mode === 'buildings') return Object.keys(BuildingCode).length;
    if (mode === 'assets') return 0;
    
    return 0;
}

const useMode = (target: StatisticsQueryMode, modes: StatisticsQueryMode[]) => {
    return modes.some(mode => mode === target);
}