import CourseMappings from '@ilefa/husky/courses.json';

import { NextApiRequest, NextApiResponse } from 'next';
import { CompleteCoursePayload, CourseAttributes, isValidCampus } from '../../../util';
import { CampusType, COURSE_IDENTIFIER, searchCourse, SearchParts } from '@ilefa/husky';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method && req.method !== 'GET')
        return res
            .status(405)
            .json({ message: 'Method not allowed' });

    let start = Date.now();
    let { name, campus, bare, initial } = req.query;
    if (name instanceof Array || campus instanceof Array || bare instanceof Array || initial instanceof Array)
        return res
            .status(400)
            .json({ message: 'Invalid course payload' });

    if (!name || !COURSE_IDENTIFIER.test(name))
        return res
            .status(400)
            .json({ message: 'Invalid course name' });

    if (campus && !isValidCampus(campus))
        return res
            .status(400)
            .json({ message: 'Invalid campus type' });

    let useBare = false;
    if (bare && bare.toLowerCase() === 'true')
        useBare = true;

    let useInitial = false;
    if (initial && initial.toLowerCase() === 'true') {
        useInitial = true;
        useBare = false;
    }

    // don't query professors so we save time on initial load
    let course = await searchCourse(name, campus ? campus as CampusType : 'any', useBare, useInitial ? [SearchParts.SECTIONS] : [SearchParts.SECTIONS, SearchParts.PROFESSORS]);
    let mappings = (CourseMappings as any).filter(mapping => mapping.name === name)[0];

    if (!course || !mappings)
        return res
            .status(404)
            .json({ message: 'Course not found' });

    // TODO: Figure out a better way to do this, times out almost all requests.    // let patchedSections = await Promise.all(course.sections.map(async section => {
    //     let enrollment = await getRawEnrollment(section.internal.termCode, section.internal.classNumber, section.internal.classSection);

    //     return {
    //         ...section,
    //         enrollment: {
    //             max: enrollment.total,
    //             current: enrollment.available,
    //             waitlist: section.enrollment.waitlist,
    //             full: enrollment.overfill,
    //         }
    //     }
    // }));

    let payload: CompleteCoursePayload = {
        name: mappings.name,
        catalogName: mappings.catalogName,
        catalogNumber: mappings.catalogNumber,
        attributes: mappings.attributes as CourseAttributes,
        grading: course.grading,
        credits: parseInt(course.credits),
        prerequisites: course.prereqs,
        description: course.description,
        sections: course.sections,
        professors: course.professors
    }

    return res
        .status(200)
        .json({
            ...payload,
            timings: Date.now() - start,
        });
}