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
    if (mode === 'courses') return CourseMappings.length;
    if (mode === 'professors') return RmpMappings.length;
    if (mode === 'rooms') return Classrooms.length;
    if (mode === 'buildings') return Object.keys(BuildingCode).length;
    if (mode === 'assets') return 0;
    
    return 0;
}

const useMode = (target: StatisticsQueryMode, modes: StatisticsQueryMode[]) => {
    return modes.some(mode => mode === target);
}