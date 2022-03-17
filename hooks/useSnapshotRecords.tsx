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