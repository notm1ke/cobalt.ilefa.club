/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import { RateMyProfessorReport } from '@ilefa/husky';

import {
    ApiResponseType,
    createRemoteHook,
    DefaultShapedHook,
    IMetricsComponent,
    TimedRequest,
    UnshapedApiResponse
} from '../util';

export interface ProfessorLookupProps extends IMetricsComponent {
    rmpIds: string[];
}

export type RmpResponse = RateMyProfessorReport & TimedRequest & UnshapedApiResponse & {
    mostRelevant: string;
}

export const useProfessor = ({ rmpIds, recordMetric }: ProfessorLookupProps): DefaultShapedHook<RmpResponse> =>
    createRemoteHook<RmpResponse, DefaultShapedHook<RmpResponse>>('Professor', `/api/professor/${rmpIds.length ? rmpIds.join(',') : 'noop'}`,
        (type, data, _err, url) => {
            switch (type) {
                case ApiResponseType.ERROR:
                    recordMetric({ request: url, success: false, time: -1, data });
                    return [null, url, false, true];
                case ApiResponseType.LOADING:
                    return [null, url, true, false];
                case ApiResponseType.SUCCESS:
                    recordMetric({ request: url, success: true, time: data!.timings, data });
                    return [data!, url, false, false];
            }
        });