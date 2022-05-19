/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
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