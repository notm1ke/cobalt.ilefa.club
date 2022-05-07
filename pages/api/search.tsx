/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import CourseMappings from '@ilefa/husky/courses.json';

import { isGradLevel } from '../../util';
import { ContentArea } from '@ilefa/husky';
import { NextApiRequest, NextApiResponse } from 'next';

type Modifiers = 'ca1'
               | 'ca2'
               | 'ca3'
               | 'ca4'
               | 'ca4int'
               | 'lab'
               | 'w'
               | 'q'
               | 'e'
               | 'g'
               | 'ug';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method && req.method !== 'POST')
        return res
            .status(405)
            .json({ message: 'Method not allowed' });

    let { input, advancedOpts, limit: limitIn } = JSON.parse(req.body);
    if (input instanceof Array) {
        return res
            .status(400)
            .json({ message: 'Bad Request' });
    }

    let limit = -1;
    if (!limitIn || limitIn instanceof Array)
        limit = -1;

    if (!input || input.length === 0)
        return res
            .status(200)
            .json({ courses: [] });

    const predicates: ((input: string, course: any) => boolean)[] = [
        (input, { name, catalogName }) => name.toLowerCase().slice(0, input.length) === input.toLowerCase()
                                       || catalogName.toLowerCase().slice(0, input.length) === input.toLowerCase(),
        (input, { name, catalogName }) => name.toLowerCase().includes(input)
                                       || catalogName.toLowerCase().includes(input),
        // prevent regex DoS attack -- possibly re-enable in the future
        // (input, { name, catalogName }) => new RegExp(input).test(name)
        //                                || new RegExp(input).test(catalogName),
    ];

    const processModifiers = (modifiers: Modifiers[], data: any[]) => {
        let copy = [...data];

        if (hasModifier(modifiers, 'ca1'))
            copy = copy.filter(ent => hasContentArea(ent, ContentArea.CA1))
            
        if (hasModifier(modifiers, 'ca2'))
            copy = copy.filter(ent => hasContentArea(ent, ContentArea.CA2))
            
        if (hasModifier(modifiers, 'ca3'))
            copy = copy.filter(ent => hasContentArea(ent, ContentArea.CA3))
            
        if (hasModifier(modifiers, 'ca4'))
            copy = copy.filter(ent => hasContentArea(ent, ContentArea.CA4))
            
        if (hasModifier(modifiers, 'ca4int'))
            copy = copy.filter(ent => hasContentArea(ent, ContentArea.CA4INT))
            
        if (hasModifier(modifiers, 'lab'))
            copy = copy.filter(ent => ent.attributes.lab)
            
        if (hasModifier(modifiers, 'w'))
            copy = copy.filter(ent => ent.attributes.writing)
            
        if (hasModifier(modifiers, 'q'))
            copy = copy.filter(ent => ent.attributes.quantitative)
            
        if (hasModifier(modifiers, 'e'))
            copy = copy.filter(ent => ent.attributes.environmental);

        if (hasModifier(modifiers, 'g'))
            copy = copy.filter(ent => isGradLevel(ent.name.split(/\d/)[0], ent.catalogNumber));

        if (hasModifier(modifiers, 'ug'))
            copy = copy.filter(ent => !isGradLevel(ent.name.split(/\d/)[0], ent.catalogNumber));

        return copy;
    }

    const hasModifier = (modifiers: Modifiers[], target: Modifiers) => modifiers.some(modifier => modifier === target);

    const isValidModifier = (input: string): input is Modifiers => {
        let lower = input.toLowerCase();
        return lower === 'ca1'
            || lower === 'ca2'
            || lower === 'ca3'
            || lower === 'ca4'
            || lower === 'ca4int'
            || lower === 'lab'
            || lower === 'w'
            || lower === 'q'
            || lower === 'e'
            || lower === 'g'
            || lower === 'ug';
    }

    const hasContentArea = (course: any, area: ContentArea) => 
        course
            .attributes
            .contentAreas
            .some(ca => ca === area);

            let modifiers = [
                ...input
                    .split(' ')
                    .filter(input => input.startsWith('+'))
                    .map(token => token.substring(1))
                    .filter(isValidModifier),
                ...Object
                    .keys(advancedOpts)
                    .filter(opt => advancedOpts[opt])
                    .filter(isValidModifier)
            ];

    let result = (CourseMappings as any)
        .filter(course => predicates.some(predicate =>
            predicate(input
                .split(' ')
                .filter(token => !token.startsWith('+'))
                .join(' '), course)))
        .sort((a, b) => {
            let aStart = a.name.toLowerCase().slice(0, input.length) === input.toLowerCase();
            let bStart = b.name.toLowerCase().slice(0, input.length) === input.toLowerCase();
            if (aStart && bStart)
                return a.name.localeCompare(b.name);

            if (aStart && !bStart)
                return -1;

            if (bStart && !aStart)
                return 1;

            return a.name.localeCompare(b.name);
        })    
        .slice(0, limit === -1
            ? undefined
            : limit);

    result = processModifiers(modifiers, result);
    result = result.filter((course: any, index: number, self: any[]) =>
        index === self.findIndex(t => (
            t.name === course.name &&
            t.catalogNumber === course.catalogNumber
        ))
    );

    return res
        .status(200)
        .json({ query: input, courses: result });
}