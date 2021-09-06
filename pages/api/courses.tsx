import CourseMappings from '@ilefa/husky/courses.json';

import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method && req.method !== 'GET')
        return res
            .status(405)
            .json({ message: 'Method not allowed' });

    return res
        .status(200)
        .json({
            courses: CourseMappings.map(ent => ({
                name: ent.name,
                gradingType: ent.grading,
                catalogName: ent.catalogName,
                attributes: ent.attributes
            }))
        });
}