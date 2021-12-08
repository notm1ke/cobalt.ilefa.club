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
        if (prof.name.includes(',')) {
            let names = prof
                .name
                .split(',')
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

    return res
        .status(200)
        .json({
            professors,
            timings: Date.now() - start
        });
}