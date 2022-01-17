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