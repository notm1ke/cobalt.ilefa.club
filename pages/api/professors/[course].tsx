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

import {
    CampusType,
    COURSE_IDENTIFIER,
    ProfessorData,
    searchCourse,
    SearchParts
} from '@ilefa/husky';

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

    let result = await searchCourse(course, campus ? campus as CampusType : 'any', false, [SearchParts.SECTIONS, SearchParts.PROFESSORS]);
    if (!course)
        return res
            .status(404)
            .json({ message: 'Course not found' });

    // some professors are listed as 'Name 1, Name 2', this creates separate objects for each
    let professors = result.professors;
    for (let prof of professors) {
        if (prof.name.includes(' & ')) {
            let names = prof
                .name
                .split(' & ')
                .map(name => name.trim());

            prof.name = names[0];

            let others: ProfessorData[] = names
                .slice(1)
                .map(name => ({
                    ...prof,
                    name
                }));

            professors.push(...others);
        }
    }

    professors = professors.filter((prof, i) => professors.findIndex(p => p.name === prof.name) === i);

    return res
        .status(200)
        .json({
            professors,
            timings: Date.now() - start
        });
}