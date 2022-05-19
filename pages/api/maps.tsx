/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import axios from 'axios';

import { MarkerPayload } from '../../hooks';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method && req.method !== 'GET')
        return res
            .status(405)
            .json({ message: 'Method not allowed' });

    let markers = await axios
        .get(process.env.CARTOGRAPHER_TARGET!)
        .then(res => res.data)
        .then(res => res as MarkerPayload[])
        .catch(_ => null);

    if (!markers) return res
        .status(502)
        .json({ message: 'Bad Gateway' });

    return res
        .status(200)
        .json({ markers });
}