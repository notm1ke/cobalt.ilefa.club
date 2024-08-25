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