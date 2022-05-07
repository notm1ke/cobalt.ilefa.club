/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
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