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

import axios from 'axios';

import { NextApiRequest, NextApiResponse } from 'next';
import { getServiceStatus, UConnService, UConnServiceStatus } from '@ilefa/husky';

import {
    CustomUConnServices,
    CustomUConnServiceString,
    getDisplayNameForService,
    getEnumKeyByEnumValue
} from '../../util';

export const ValidCustomServices = [
    {
        name: 'Catalog',
        token: 'catalog',
        url: 'https://catalog.uconn.edu/directory-of-courses'
    },
    {
        name: 'Dining',
        token: 'dining',
        url: 'http://nutritionanalysis.dds.uconn.edu/shortmenu.aspx?sName=UCONN+Dining+Services&locationNum=01&locationName=Whitney+Dining+Hall&naFlag=1'
    },
    {
        name: 'Phonebook',
        token: 'phonebook',
        url: 'https://phonebook.uconn.edu'
    },
]

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method && req.method !== 'GET')
        return res
            .status(405)
            .json({ message: 'Method not allowed' });

    let { include } = req.query;
    if (include instanceof Array)
        return res
            .status(400)
            .json({ message: 'Invalid included services payload' });

    if (!include)
        return res
            .status(400)
            .json({ message: 'Included services parameter missing' });

    if (include === 'all')
        include = CustomUConnServices.join(',');

    let filtered = include
        .split(',')
        .map(token => token.toLowerCase().replace(/\s/, '_'))
        .filter(token => CustomUConnServices.includes(token));

    let status: any[] = [];
    let std = filtered
        .map(key => convertCustomToManaged(key))
        .filter(key => key !== 'UNKNOWN')
        .map(key => UConnService[key]);

    if (std.length)
        status.push(...await getServiceStatus(...std));

    let custom = await Promise.all(filtered
        .filter(token => ValidCustomServices.some(srv => srv.token === token))
        .map(token => ValidCustomServices.find(srv => srv.token === token))
        .map(async token => await getRemoteStatus(token!.name, token!.url)));

    status.push(...custom.map(srv => ({ ...srv, display: getDisplayNameForService(srv.service as CustomUConnServiceString) })));

    return res
        .status(200)
        .json({ status });
}

const getRemoteStatus = async (name: string, url: string, degradedThreshold = 2500, timeout = 5000): Promise<any> => {
    const start = Date.now();
    return await axios
        .get(url, { timeout })
        .then(_ => {
            let diff = Date.now() - start;
            let status = diff >= degradedThreshold
                ? UConnServiceStatus.DEGRADED
                : UConnServiceStatus.OPERATIONAL;

            return ({
                service: name,
                status,
                time: Date.now()
            });
        })
        .catch(_ => ({ service: name, status: UConnServiceStatus.OUTAGE, time: Date.now() }));
}

const convertCustomToManaged = (service: string) => getEnumKeyByEnumValue(UConnService, service.toUpperCase().replace('_', ' '), false) || 'UNKNOWN';