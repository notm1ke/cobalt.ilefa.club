import { isValidCampus } from '../../../util';
import { NextApiRequest, NextApiResponse } from 'next';
import { CampusType, COURSE_IDENTIFIER, searchCourse } from '@ilefa/husky';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method && req.method !== 'GET')
        return res
            .status(405)
            .json({ message: 'Method not allowed' });

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
        .json({ ...result.sections });
}