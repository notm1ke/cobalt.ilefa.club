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

import { ApiResponseType, createRemoteHook, getLastSemester, TimedRequest, UnshapedApiResponse } from '../util';

export type SnapshotRecordsPayload = UnshapedApiResponse & TimedRequest & {
    courses: number;
    professors: number;
    classrooms: number;
}

export type ShapedSnapshotRecordsPayload = [
    SnapshotRecordsPayload | null,
    boolean,
    boolean
]

export const useSnapshotRecords = (semester: string = getLastSemester()): ShapedSnapshotRecordsPayload =>
    createRemoteHook<SnapshotRecordsPayload, ShapedSnapshotRecordsPayload>('Statistics', `https://snapshots.ilefa.club/api/records/${semester.replace(/\s/g, '')}?parts=full`,
        (type, data, _err, _url) => {
            switch (type) {
                case ApiResponseType.ERROR:
                    return [null, false, true];
                case ApiResponseType.LOADING:
                    return [null, true, false];
                case ApiResponseType.SUCCESS:
                    return [data!, false, false];
            } 
        })