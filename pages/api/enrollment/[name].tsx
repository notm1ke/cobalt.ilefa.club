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

import { TERM_REGEX } from '../../../util';
import { NextApiRequest, NextApiResponse } from 'next';

import {
    COURSE_IDENTIFIER,
    getRawEnrollment,
    searchCourse,
    SearchParts,
    SECTION_IDENTIFIER
} from '@ilefa/husky';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method && req.method !== 'GET')
        return res
            .status(405)
            .json({ message: 'Method not allowed' });

    let start = Date.now();
    let { name, section, term } = req.query;
    if (name instanceof Array || section instanceof Array || term instanceof Array)
        return res
            .status(400)
            .json({ message: 'Invalid request payload' });

    if (!name || !COURSE_IDENTIFIER.test(name))
        return res
            .status(400)
            .json({ message: 'Invalid course name' });

    if (!section || !SECTION_IDENTIFIER.test(section))
        return res
            .status(400)
            .json({ message: 'Invalid section' });

    if (!term || !TERM_REGEX.test(term))
        return res
            .status(400)
            .json({ message: 'Invalid term' });

    let data = await searchCourse(name, 'any', false, [SearchParts.SECTIONS]);
    if (!section)
        return res
            .status(404)
            .json({ message: 'Course not found' });

    let target = data.sections.find(s => s.section === section && s.term.replace(/\s/g, '').toLowerCase() === term.toString().toLowerCase());
    if (!target)
        return res
            .status(404)
            .json({ message: 'Section not found' });

    let enrollment = await getRawEnrollment(target.internal.termCode, target.internal.classNumber, target.internal.classSection);

    return res
        .status(200)
        .json({
            ...enrollment,
            timings: Date.now() - start,
        });
}