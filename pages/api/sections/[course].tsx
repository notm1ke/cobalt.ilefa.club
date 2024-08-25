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

import { isValidCampus } from '../../../util';
import { NextApiRequest, NextApiResponse } from 'next';
import { CampusType, COURSE_IDENTIFIER, searchCourse } from '@ilefa/husky';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method && req.method !== 'GET')
        return res
            .status(405)
            .json({ message: 'Method not allowed' });

    let start = Date.now();
    let { course, campus } = req.query;
    if (course instanceof Array || campus instanceof Array)
        return res
            .status(400)
            .json({ message: 'Invalid course payload' });

    if (!course || !COURSE_IDENTIFIER.test(course))
        return res
            .status(400)
            .json({ message: 'Invalid course name' });

    if (campus && !isValidCampus(campus))
        return res
            .status(400)
            .json({ message: 'Invalid campus type' });

    let result = await searchCourse(course, campus ? campus as CampusType : 'any');
    if (!course)
        return res
            .status(404)
            .json({ message: 'Course not found' });

    return res
        .status(200)
        .json({
            ...result.sections,
            timings: Date.now() - start
        });
}