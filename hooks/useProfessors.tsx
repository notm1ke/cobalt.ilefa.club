/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import { ProfessorData } from '@ilefa/husky';

import {
    ApiResponseType,
    createRemoteHook,
    DefaultShapedHook,
    IMetricsComponent,
    TimedRequest,
    UnshapedApiResponse
} from '../util';

export interface ProfessorsLookupProps extends IMetricsComponent {
    course: string;
    campus?: string;
}

export type ProfessorsPayload = UnshapedApiResponse & TimedRequest & {
    professors: ProfessorData[] | null;
}

export const useProfessors = ({ course, campus, recordMetric }: ProfessorsLookupProps): DefaultShapedHook<ProfessorsPayload> => 
    createRemoteHook<ProfessorsPayload, DefaultShapedHook<ProfessorsPayload>>('Professors', `/api/professors/${course + (campus ? `?campus=${campus}` : '')}`,
        (type, data, _err, url) => {
            switch (type) {
                case ApiResponseType.ERROR:
                    recordMetric({ request: url, success: false, time: -1, data });
                    return [{ professors: null, timings: -1 }, url, false, true];
                case ApiResponseType.LOADING:
                    return [{ professors: null, timings: -1 }, url, true, false];
                case ApiResponseType.SUCCESS:
                    recordMetric({ request: url, success: true, time: data!.timings, data });
                    return [{ professors: data!.professors, timings: data!.timings }, url, false, false];
            }
        })