/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import { SimpleExternalCourse } from '@ilefa/bluetrade';

import {
    ApiResponseType,
    DefaultShapedHook,
    createRemoteHook,
    TimedRequest,
    UnshapedApiResponse
} from '../util';

export interface BluetradeQueryProps {
    course: string;
}

export type BluetradeResponsePayload = TimedRequest & UnshapedApiResponse & {
    transferable: SimpleExternalCourse[];
};

export const useBluetrade = ({ course }: BluetradeQueryProps): DefaultShapedHook<BluetradeResponsePayload> =>
    createRemoteHook<BluetradeResponsePayload, DefaultShapedHook<BluetradeResponsePayload>>('Bluetrade', `/api/bluetrade/${course}`,
        (type, data, _err, url) => {
            switch (type) {
                case ApiResponseType.ERROR:
                    return [null, url, false, true];
                case ApiResponseType.LOADING:
                    return [null, url, true, false];
                case ApiResponseType.SUCCESS:
                    return [data!, url, false, false];
            }
        });