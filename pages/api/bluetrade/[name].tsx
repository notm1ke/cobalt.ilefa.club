/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import { getEquiv } from '@ilefa/bluetrade';
import { COURSE_IDENTIFIER } from '@ilefa/husky';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method && req.method !== 'GET')
        return res
            .status(405)
            .json({ message: 'Method not allowed' });

    let start = Date.now();
    let { name } = req.query;
    if (!name || name instanceof Array)
        return res
            .status(400)
            .json({ message: 'Bad Request' });

    if (!COURSE_IDENTIFIER.test(name))
        return res
            .status(404)
            .json({ message: 'Invalid course' });

    let equiv = getEquiv(name);
    return res
        .status(200)
        .json({
            transferable: equiv.map(equiv => equiv.external),
            timings: Date.now() - start
        });
}