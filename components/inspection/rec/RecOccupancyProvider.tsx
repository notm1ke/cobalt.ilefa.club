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

import { useBluefit } from '../../../hooks'
import { cloneElement, ReactElement } from 'react';

export interface RecOccupancyProviderProps {
    pollTime: number;
    children: ReactElement[];
}

export const RecOccupancyProvider: React.FC<RecOccupancyProviderProps> = ({ pollTime, children }) => {
    const [occupancy, _req, loading, error] = useBluefit(pollTime, new Date().getDay(), 'occupants');
    return <>{children.map(child => cloneElement(child, { ...child.props, data: loading || error ? -1 : occupancy!.occupants, timings: loading || error ? -1 : occupancy!.timings }))}</>;
}