/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import { ApiResponseType, createRemoteHook, StatisticsQueryMode, UnshapedApiResponse } from '../util';

export type StatisticsPayload = UnshapedApiResponse & {
    courses: number;
    professors: number;
    rooms: number;
    buildings: number;
    assets: number;
}

export type ShapedStatisticsPayload = [
    StatisticsPayload | null,
    boolean,
    boolean
]

export const useStatistics = (...mode: StatisticsQueryMode[]): ShapedStatisticsPayload =>
    createRemoteHook<StatisticsPayload, ShapedStatisticsPayload>('Statistics', `/api/statistics?mode=${mode.join(',')}`,
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